/**
 * token.service
 */
import { LitService } from '@litstack/core';
import { PersonService } from './person.service';
import { throwError, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import * as jwt from 'jsonwebtoken';

import { AppConstants } from '../../app.constants';
import { IPerson } from '../models/person.model';

@LitService()
export class TokenService {

    constructor(private personService: PersonService){}

    /**
     * @method create
     * @param email 
     * @param pass 
     */
    create(email: string, pass: string) {
        return this.personService.findByEmailAndPassword(email, pass)
            .pipe(
                mergeMap(
                    (people) => people && people.length < 1
                    ? throwError(AppConstants.EMAIL_PASSWORD_INCORRECT)
                    : of(this.getTokenFromPerson(people[0]))
                )
            );
    }

    /**
     * @method getTokenFromPerson
     * @param person 
     */
    private getTokenFromPerson(person: IPerson): string {
        return jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            sub: person.id,
            name: person.name
        }, AppConstants.JWT_SECRET);
    }
}