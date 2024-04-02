import UsersDao from '../dao/users.dao.js';
import UsersRepository from '../repository/users.repository.js';

const usersRepository = new UsersRepository(UsersDao)

export default class UsersController {
    static async get(){
       const allData = await usersRepository.get();
       //discrimina usuarios de datos de sesion
        return allData.filter((elem) => elem.first_name );
    }

    static findByEmail(email){
        return usersRepository.findByEmail(email);
    }
    static findById(uid){
        return usersRepository.findById(uid);
    }

    static createUser(newUser){
        return usersRepository.createUser(newUser);
    }

    static updateUser(email,user){
        return usersRepository.updateUser(email,user);
    }
    static findAndUpdate(sid,data){
        return usersRepository.findAndUpdate( sid,data);
    }
    static findAndDelete(email){
        return usersRepository.findAndDelete({email})  
    }
}