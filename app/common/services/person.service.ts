/**
 * person.service
 */
import { LitService } from '@litstack/core';
import { Model } from 'mongoose';
import { from, Observable, throwError } from 'rxjs';

import * as uuid from 'uuid';

import { Person, IPerson } from '../../common/models/person.model';
import { ResourceService } from './resource.service';
import { sha256 } from '../utils/sha256.util';

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
            password: sha256(password)
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
     public create(params: {
         email: string;
         password: string;
         name: string;
     }): Observable<IPerson> {
        const aPerson: IPerson = new Person({
            id: uuid.v4(),
            email: params.email,
            password: params.password ? sha256(params.password) : null,
            name: params.name
        });

        return from(aPerson.save());
     }
}