export default class TicketsRepository{
    constructor(dao){
        this.dao = dao;
    }

    async create(purchaseData){
        return this.dao.create(purchaseData);
    }
    async delete(_id){
        return this.dao.delete(_id);
    }
    async getById(_id){
        return this.dao.getById(_id);
    }
}