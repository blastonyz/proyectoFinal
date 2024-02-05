import winston from 'winston';
import config from '../config/config.js';



const customLevelOpts = {
    levels: {fatal: 0,
    error:1,
    warning:2,
    info:3,
    http:4,
    debug:5  
    },
}

export const devLogger = winston.createLogger({
    levels:customLevelOpts.levels,
    transports : [
        new winston.transports.Console({level:'debug'}),
    ],
});


export const prodLogger = winston.createLogger({
    levels:customLevelOpts.levels,
    transports : [
        new winston.transports.Console({level:'info'}),
        new winston.transports.File({ filename: './errors.log', level:'error'})
    ],
});

export const logger = config.mode === 'production'? prodLogger: devLogger;

export const addLogger = (req,res,next) => {
    req.logger = logger;
    next();
};