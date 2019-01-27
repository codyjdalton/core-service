/**
 * notification.service
 */
import { LitService } from '@litstack/core';
import { from } from 'rxjs';

import * as mail from'@sendgrid/mail';
import { Observable } from 'rxjs';

@LitService()
export class NotificationService {

    // we don't want to actually send email in our tests
    // but want to keep this as private as possible 
    // use protected for testing purposes
    protected mailProvider = mail;

    constructor() {

        // set the sendgrid api key
        this.mailProvider.setApiKey(process.env.SENDGRID_API_KEY);
    }

    sendMail(): Observable<any> {
        const msg = {
            to: 'codyjdalton@gmail.com',
            from: 'info@codydalton.me',
            subject: 'Sending with SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
        return from(this.mailProvider.send(msg));
    }
}