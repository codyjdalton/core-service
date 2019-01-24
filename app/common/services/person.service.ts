/**
 * person.service
 */
import { LitService } from '@litstack/core';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import * as uuid from 'uuid';

import { Person, IPerson } from '../../common/models/person.model';
import { ResourceService } from './resource.service';

@LitService()
export class PersonService extends ResourceService {

    /**
     * @property model
     * @type {IPerson}
     */
    public model: Model<IPerson> = Person;

    /**
     * @method findByEmailAndPassword
     * @param {string} email
     * @param {string} password
     * @return {Observable<IPerson[]>}
     * @TODO Hash password prior to select
     */
    public findByEmailAndPassword(email: string, password: string): Observable<IPerson[]> {
        return this.findByParams({
            email: email,
            password: password
        });
    }

    /**
     * @method create
     * @param {string} email
     * @param {string} password
     * @param {name} name
     * @return {Observable<IPerson>}
     * @TODO Validate email, password
     * @TODO Hash password prior to storage
     */
     public create(body: {
         email: string;
         password: string;
         name: string;
     }): Observable<IPerson> {
        const aPerson: IPerson = new Person({
            id: uuid.v4(),
            email: body.email,
            password: body.password,
            name: body.name
        });

        return from(aPerson.save());
     }
}