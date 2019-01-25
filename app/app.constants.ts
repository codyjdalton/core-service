require('dotenv').config();
export const AppConstants = {

    DATASOURCE: process.env.DATASOURCE,

    JWT_SECRET: process.env.JWT_SECRET,

    // content types
    MESSAGE_V1: 'application/vnd.message.v1+json',

    // messages
    WELCOME_MESSAGE: 'Hello, you have reached the service',
    EMAIL_PASSWORD_INCORRECT: 'Unable to find email/password combination'
};