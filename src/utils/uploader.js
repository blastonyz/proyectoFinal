import { __dirname } from "../utils.js";
import multer from 'multer';
import path from "path";

const storage = multer.diskStorage({
    
    destination: function(req,file,cb){
        console.log('filename',file.originalname)
        let folder;
        switch (true) {
            case file.originalname.includes('profile'):
                folder = '/profile';
                break;
            case file.originalname.includes('products'):
                folder = '/products';
                break;
            default:
                folder = '/documents';
        }
        cb(null,path.join(__dirname, `../public/images/${folder}`))
    },
        filename: function(req,file,cb){
            cb(null, `${Date.now()}-${file.originalname}`)
        } 
    });

const uploader = multer({storage}).fields([{name:'profile', maxCount: 3}, {name:'documents', maxCount: 5},{ name: 'products', maxCount: 1 } ])

export default uploader;
