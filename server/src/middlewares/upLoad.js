const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "../client/public/pik");
  },
  filename(req, file, cb) {
    const type = file.originalname.match(/(\.\w*)/gi)[0];
    const fileName = `photo-${crypto.randomUUID()}${type}`;
    cb(null, fileName);
  },
});

const types = ["image/png", "image/jpeg", "image/jpg"];

const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({ storage, fileFilter });
