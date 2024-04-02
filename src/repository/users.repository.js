export default class UsersRepository {
    constructor(dao){
        this.dao = dao;
    }
    async get(){
        return this.dao.get();
    }

    async findByEmail(email){
        return this.dao.findByEmail(email);
    }
    async findById(uid){
        return this.dao.findById(uid);
    }

    async createUser(newUser){
        return this.dao.createUser(newUser);
    }

    async updateUser(email,user){
        return this.dao.updateUser(email,user);
    }
    async findAndUpdate(sid,data){
        return this.dao.findAndUpdate(sid,data);
    }
    async findAndDelete({email}){
        return this.dao.findAndDelete(email);
    }
}