import TicketsModels from '../models/tickets.models.js';
import TicketsRepository from '../repository/tickets.repository.js';

export default class TicketsDao extends TicketsRepository{
    static create(purchaseData){
        const newPurchase =  TicketsModels.create(purchaseData);
        console.log(`Compra efectuada: ${{newPurchase}} `);
        return newPurchase;
        
    }
    static delete(_id){
        return TicketsModels.deleteOne(_id);
    }
    static getById(_id){
        return TicketsModels.findById(_id);
    }
}