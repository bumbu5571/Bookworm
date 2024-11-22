const router = require("express").Router();
const { Favorite, Book } = require("../../db/models");
const verifyAccessToken = require("../middlewares/verifyAccessToken");

router.get("/", verifyAccessToken, async (req, res) => {
  try {
    const allfavs = await Favorite.findAll({
      where: { userId: res.locals.user.id },
      include:{model:Book}
    });
    res.json(allfavs);
  } catch (error) {
    res.sendStatus(400);
  }
});

// В favorites.api.router.js
router.post("/", verifyAccessToken, async (req, res) => {
  try {
    const favorite = await Favorite.create({
      userId: res.locals.user.id,
      bookId: req.body.bookId
    });
    res.status(201).json(favorite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.delete("/:id", verifyAccessToken, async (req, res) => {
  try {
    await Favorite.destroy({
      where: {
        userId: res.locals.user.id,
        bookId: req.params.id
      }
    });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

module.exports = router;
