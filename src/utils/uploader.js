import { __dirname } from "../utils.js";
import multer from 'multer';
import path from "path";

const storage = multer.diskStorage({
    
    destination: function(req,file,cb){
        let folder;
        if(file.originalname.includes('profile')){
            folder = '/profile'
        }else if(file.originalname.includes('documents')){
            folder = '/documents'
        }else{
            folder = '/products'
        }
        cb(null,path.join(__dirname, `../public/images/${folder}`))
    },
        filename: function(req,file,cb){
            cb(null, `${Date.now()}-${file.originalname}`)
        } 
    });

const uploader = multer({storage}).fields([{name:'profile', maxCount: 3}, {name:'documents', maxCount: 5}])

export default uploader;
