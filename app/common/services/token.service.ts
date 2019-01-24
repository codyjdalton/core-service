/**
 * token.service
 */
import { LitService } from '@litstack/core';
import { PersonService } from './person.service';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { IPerson } from '../models/person.model';

@LitService()
export class TokenService {

    constructor(private personService: PersonService){}

    create(email: string, pass: string): Observable<string | null> {

        let token: string | null = null;

        return this.personService.findByEmailAndPassword(email, pass)
            .pipe(
                tap((people: IPerson[]) => {
                    if(people && people[0]) {
                        token = this.getTokenFromPerson(people[0]);
                    } else {
                        throw Error();
                    }
                }),
                map(() => token)
            );
    }

    private getTokenFromPerson(person: IPerson): string {
        return JSON.stringify(person);
    }
}