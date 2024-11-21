const router = require("express").Router();
const { Book } = require("../../db/models");

router.get("/", async (req, res) => {
  try {
    const allbooks = await Book.findAll();
    // console.log(allbooks);
    res.json(allbooks);
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports = router;
