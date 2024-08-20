const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, callback){ // this is anonymous fun
        callback(null, './uploads')
    },
    filename : function(req, file, callback){
        // this callback function for creating the file name based on time 
        callback(null, new Date().getTime() + path.extname(file.originalname))
    }
});

// check file type 
const fileFilter = (req, file, callback) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        callback(null, true)
    }else{
        callback(new Error('Unsupported file type'), false)
    }
}


// upload files
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // file size limit is 5 MB 
    },
    fileFilter: fileFilter
})


module.exports = {
    upload: upload
}