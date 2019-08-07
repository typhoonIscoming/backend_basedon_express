const multer = require('multer');
const fs = require('fs');
const path = require('path')

const createFolder = function(folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
}; 
const uploadFolder = path.join(process.cwd(), '/upload');

createFolder(uploadFolder);

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadFolder);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname); 
    }
});
upload = multer({ storage: storage });

module.exports = upload