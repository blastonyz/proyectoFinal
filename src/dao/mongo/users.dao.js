import UsersModel from '../../models/users.model.js';

export default class UsersDao {
    static get(){
        return UsersModel.find();
    }

    static findByEmail(email){
        return UsersModel.findOne(email);
    }
    static findById(uid){
        return UsersModel.findById(uid);
    }

    static createUser(newUser){
        return UsersModel.create(newUser);
    }

    static updateUser(email,user){
        return UsersModel.updateOne(email,user);
    }
    static findAndUpdate(sid,data){
        return UsersModel.findByIdAndUpdate(sid,data);
    }
    static findAndDelete(email){
        return UsersModel.findOneAndDelete({email});
    }
}