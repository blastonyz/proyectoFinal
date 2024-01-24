export default class UsersDTO {
    constructor(user){
        this.firstName = user.first_name;
        this.lastName = user.last_name;
    }
}