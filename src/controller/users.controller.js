import UsersDao from '../dao/users.dao.js';
import UsersRepository from '../repository/users.repository.js';

const usersRepository = new UsersRepository(UsersDao)

export default class UsersController {

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
}