const multer = require("multer");

const FILE_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("Invalid image type");
    if(isValid) uploadError = null;
    cb(uploadError, 'public/uploads')
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.replace(" ","-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  }
})

const upload = multer({ storage: storage}).single("image")

module.exports = upload