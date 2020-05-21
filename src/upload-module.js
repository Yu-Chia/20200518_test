const multer = require('multer');

const extMap = {
    'image/jpeg': '.jpg',
    'image/png': '.png'
}

const {v4: uuid_v4}= require('uuid');
// console.log(uuid_v4());

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, __dirname + '/../public/img-uploads')
    },
    filename: function(req, file, cb){
        let ext = extMap[file.mimetype];
        cb(null, uuid_v4() + ext);
    }
});

const filefilter = function(req, file, cb){
    cb(null, !!extMap[file.mimetype]);
}

const uploads = multer({storage, filefilter});
module.exports = uploads;