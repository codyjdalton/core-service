/**
 * token.service
 */
import { LitService } from '@litstack/core';
import { PersonService } from './person.service';
import { Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { IPerson } from '../models/person.model';

@LitService()
export class TokenService {

    constructor(private personService: PersonService){}

    create(email: string, pass: string): Observable<string | null> {

        let token: string | null = null;

        return this.personService.findByEmailAndPassword(email, pass)
            .pipe(
                tap((people: IPerson[]) => {
                    try {
                        if(!people || people.length < 1) {
                            // @TODO move this message into a central location
                            throw 'Unable to find person with that username/password combination';
                        }

                        token = this.getTokenFromPerson(people[0]);
                    }
                    catch(e) {
                        throw Error(e);
                    }
                }),
                map(() => {
                    if(!token) {
                        throw Error('Unable to authenticate');
                    }

                    return token;
                })
            );
    }

    private getTokenFromPerson(person: IPerson): string {
        return JSON.stringify(person);
    }
}