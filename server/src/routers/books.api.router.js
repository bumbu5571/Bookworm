const router = require("express").Router();
const { Book, Comment, User , Rating} = require("../../db/models");
const verifyAccessToken = require("../middlewares/verifyAccessToken");
router.get("/", async (req, res) => {
  try {
    const allbooks = await Book.findAll();
    res.json(allbooks);
  } catch (error) {
    res.sendStatus(400);
  }
});


router.get("/:id", verifyAccessToken, async (req, res) => {
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
    res.status(500).json({ message: "Ошибка сервера" })}});

    router.get("/:id/rating", verifyAccessToken, async (req, res) => {
      try {
        const rating = await Rating.findOne({
          where: { bookId: req.params.id, userId: req.userId }
        });
        res.json(rating);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ошибка сервера" });
      }
    });


router.get("/user", verifyAccessToken, async (req, res) => {
  try {
    const books = await Book.findAll({
      where: { creatorId: res.locals.user.id },
    });
    res.status(200).json(books);
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: "Ошибка БД" });
  }
});

router.post("/", verifyAccessToken, async (req, res) => {
  const { title, authorName, genre, description, commentText, ratingValue } =
    req.body;

  if (!(title, authorName, genre, description)) {
    return res.status(401).json({ message: "Необходимо заполнить все поля" });
  }
  try {
    const book = await Book.create({
      title,
      authorName,
      genre,
      description,
      creatorId: res.locals.user.id,
    });
    if (book) {
      const comment = await Comment.create({
        commentText,
        userId: res.locals.user.id,
        bookId: book.bookId,
      });

      const rating = await Rating.create({
        ratingValue,
        userId: res.locals.user.id,
        bookId: book.bookId,
      });
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Ошибка БД" });
  }
});

router.patch("/:id", verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  const { title, authorName, genre, description, commentText, ratingValue } = req.body;

  try {
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ message: "Книга не найдена" });
    }

    if (book.creatorId !== req.userId) {
      return res.status(403).json({ message: "У вас нет прав на редактирование этой книги" });
    }

    if (title) book.title = title;
    if (authorName) book.authorName = authorName;
    if (genre) book.genre = genre;
    if (description) book.description = description;

    await book.save();

    let newComment;
    if (commentText) {
      newComment = await Comment.create({
        commentText,
        userId: req.userId,
        bookId: book.bookId,
      });
    }

    let updatedRating;
    if (ratingValue) {
      updatedRating = await Rating.findOne({ where: { userId: req.userId, bookId: book.bookId } });
      if (updatedRating) {
        updatedRating.ratingValue = ratingValue;
        await updatedRating.save();
      } else {
        updatedRating = await Rating.create({
          ratingValue,
          userId: req.userId,
          bookId: book.bookId,
        });
      }
    }

    const comments = await Comment.findAll({
      where: { bookId: book.bookId },
      include: [{ model: User, attributes: ['name'] }],
    });

    res.status(200).json({ 
      message: "Книга успешно обновлена", 
      book,
      rating: updatedRating,
      comments,
      newComment 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при обновлении книги" });
  }
});

module.exports = router;

