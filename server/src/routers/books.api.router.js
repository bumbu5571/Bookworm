const router = require("express").Router();
const { Book, Comment, User, Rating } = require("../../db/models");
const verifyAccessToken = require("../middlewares/verifyAccessToken");
const upLoad = require("../middlewares/upLoad");

router.get("/", async (req, res) => {
  try {
    const allbooks = await Book.findAll();
    res.json(allbooks);
  } catch (error) {
    res.sendStatus(400);
  }
});

router.get("/user", verifyAccessToken, async (req, res) => {
  try {
    const books = await Book.findAll({
      where: { creatorId: req.userId },
    });
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Ошибка БД" });
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
      include: [{ model: User, attributes: ["name"] }],
    });
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.get("/:id/rating", verifyAccessToken, async (req, res) => {
  try {
    const rating = await Rating.findOne({
      where: { bookId: req.params.id, userId: req.userId },
    });
    res.json(rating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.get("/:id/ratings", async (req, res) => {
  try {
    const ratings = await Rating.findAll({
      where: { bookId: req.params.id },
    });
    res.json(ratings);
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
    console.error(error);
    res.status(400).json({ message: "Ошибка БД" });
  }
});

router.post(
  "/",
  verifyAccessToken,
  upLoad.single("photo"),
  async (req, res) => {
    const { title, authorName, genre, description, commentText, ratingValue } =
      req.body;

    if (!(title, authorName, genre, description, req.file)) {
      return res.status(401).json({ message: "Необходимо заполнить все поля" });
    }
    try {
      const path = `${req.file.destination.match(/(.\w*$)/gi)[0]}/${
        req.file.filename
      }`;

      const book = await Book.create({
        title,
        authorName,
        genre,
        description,
        creatorId: res.locals.user.id,
        bookImg: path,
      });
      if (book) {
        if (commentText) {
          const comment = await Comment.create({
          commentText,
          userId: res.locals.user.id,
          bookId: book.bookId,
        });
        };
        if (ratingValue) {
          const rating = await Rating.create({
          ratingValue,
          userId: res.locals.user.id,
          bookId: book.bookId,
        });
        };
      }
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Ошибка БД" });
    }
  }
);

router.patch("/:id", verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  const { title, authorName, genre, description } = req.body;

  try {
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ message: "Книга не найдена" });
    }

    if (book.creatorId !== req.userId) {
      return res
        .status(403)
        .json({ message: "У вас нет прав на редактирование этой книги" });
    }

    if (title) book.title = title;
    if (authorName) book.authorName = authorName;
    if (genre) book.genre = genre;
    if (description) book.description = description;

    await book.save();

    res.status(200).json({
      message: "Книга успешно обновлена",
      book,
      rating: updatedRating,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при обновлении книги" });
  }
});

module.exports = router;
