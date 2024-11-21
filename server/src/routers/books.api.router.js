const router = require("express").Router();
const { Book, Comment, User } = require("../../db/models");
const { Book, Comment, Rating } = require("../../db/models");
const verifyAccessToken = require("../middlewares/verifyAccessToken");
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


router.post("/",verifyAccessToken , async (req, res) => {
  const { title, authorName, genre, description, commentText, ratingValue } = req.body;

  if (!(title, authorName, genre, description)) {
    return res.status(401).json({ message: "Необходимо заполнить все поля" });
  }
  try {
    const book = await Book.create({
      title,
      authorName,
      genre,
      description,
    });
    if (book) {
      const comment = await Comment.create({
      commentText,
      userId: res.locals.user.id,
      bookId: book.bookId,
    })

    const rating = await Rating.create({
      ratingValue,
      userId: res.locals.user.id,
      bookId: book.bookId,
    })
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Ошибка БД" });
  }
});

module.exports = router;

