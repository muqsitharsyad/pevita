// const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __basedir + "/public/tmp/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

// let uploadFile = multer({
//   storage: storage,
//   limits: { fileSize: maxSize },
// }).single("file");

// let uploadFileMiddleware = util.promisify(uploadFile);
// module.exports = uploadFileMiddleware;

/////

exports.pdfFile = [
  multer({
      storage: storage,
      fileFilter: function (req, file, callback) {
        if(file.mimetype !== "application/pdf"){        
              return callback(new Error('Only .pdf are allowed'))
          }
          callback(null, true)
      },
      limits: { fileSize: maxSize },
    }).single("filePdf")
];