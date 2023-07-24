const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    console.log("first file", file);
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});
module.exports.upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error("image upload only png - jpg - jpeg"));
    }
    cb(undefined, true);
  },
});
