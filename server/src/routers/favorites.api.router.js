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

module.exports = router;
