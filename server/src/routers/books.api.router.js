const router = require("express").Router();
const { Book, Comment, User } = require("../../db/models");
router.get("/", async (req, res) => {
  try {
    const allbooks = await Book.findAll();
    // console.log(allbooks);
    res.json(allbooks);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Книга не найдена" });
    }
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.get("/:id/comments", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { bookId: req.params.id },
      include: [{ model: User, attributes: ['name'] }],
    });
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

module.exports = router;

