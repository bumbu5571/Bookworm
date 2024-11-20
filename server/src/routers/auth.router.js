const router = require("express").Router();
const { User } = require("../../db/models");
const bcrypt = require("bcrypt");
const genereteToken = require("../utils/generateToken");
const cookieConfig = require("../configs/cookieConfig");

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!(name && email && password)) {
    return res.status(401).json({ message: "Необходимо заполнить все поля" });
  }

  try {
    const [user, isCreated] = await User.findOrCreate({
      where: { email },
      defaults: {
        name,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });

    if (!isCreated) {
      return res.status(409).json({message: "Такой пользователь существует"});
    }

    const newUser = user.get();
    delete newUser.password;

    const { accessToken, refreshToken } = genereteToken({ user: newUser });

    return res
      .cookie("refreshToken", refreshToken, cookieConfig.refresh)
      .json({ user: newUser, accessToken });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Ошибка БД" });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    res.status(401).json({ message: "Необходимо заполнить все поля" });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(409).json({ message: "Пользователя не существует" });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res.status(409).json({ message: "Некорркетный пароль" });
    }

    const authorizedUser = user.get();
    delete authorizedUser.password;

    const { accessToken, refreshToken } = genereteToken({
      user: authorizedUser,
    });

    return res
      .cookie("refreshToken", refreshToken, cookieConfig.refresh)
      .json({ user: authorizedUser, accessToken });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Ошибка БД" });
  }
});

router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("refreshToken").sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
});

module.exports = router;
