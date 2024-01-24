import nodemailer from 'nodemailer';
import config from '../config/config.js';

export default class EmailServices{
   static #instance = null;
    constructor(){
        this.transport = nodemailer.createTransport({
            service: config.mail.emailServices,
            port: config.mail.emailPort,
            auth: {
                user: config.mail.emailUser,
                pass: config.mail.emailPassword,
            }
        });
    }

    sendEmail(to,subject,html,attachments = []){
        return this.transport.sendMail({
            from: config.mail.emailUser,
            to,
            subject,
            html,
            attachments,
        })
    }

    static getInstance(){
        if(!EmailServices.#instance){
            EmailServices.#instance = new EmailServices();
        }
        return EmailServices.#instance;
    }
}
