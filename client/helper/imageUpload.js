const multer = require("multer");


const storage = multer.diskStorage({
  destination: "/src/images",
  filename: (req, file, cb) => {
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