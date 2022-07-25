import express from 'express';
import multer from 'multer';
import { postImage } from '../controllers/Images.js';
const router = express.Router();
import fs from 'fs'
import request from 'request'
const upload = multer({ dest:'../uploads'  });

const uploadFile = async (req, res, next) => {
    const data = req.body;
    try {
        upload.single('file', data)
        res.send('success')
        // var download = function(uri, filename, callback){
        // request.head(uri, function(err, res, body){

        //     request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        // });
        // };

        // download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
        // console.log('done');
        // });
    
        next();
    } catch (error) {
        console.log(error);
    }
}


router.post('/postImage/:id', uploadFile, postImage);


// router.post('/postImage/:id',  postImage);

export default router;