
import { expect } from 'chai';
import { Injector } from 'super-injector';
import * as jwt from 'jsonwebtoken';

import { PersonService } from './person.service';
import { Person, IPerson } from '../../common/models/person.model';
import { TokenService } from './token.service';


describe('Service:TokenService', () => {

    let service: TokenService;
    let personService: PersonService;
    const aPerson = {
        email: 'testemail@gmail.com',
        name: 'test user',
        password: 'secret-key'
    };

    beforeEach(() => {

        service = Injector.resolve(TokenService);
        personService = Injector.resolve(PersonService);
    });

    afterEach((done) => {

        Person.deleteMany({})
            .then(() => {
                done();
            });
    });

    it('should create a new token when a user is found', (done) => {
        personService.create(aPerson)
            .subscribe(
                (person: IPerson) => {
                    service.create(aPerson.email, aPerson.password)
                        .subscribe(
                            t => {
                                // validate token
                                if(!jwt.verify(t, process.env.JWT_SECRET)) {
                                    done(new Error('Invalid JWT generated'))
                                }
                                done();
                            },
                            e => {
                                done(new Error('Valid token was not created'))
                            }
                        )
                }
            );
    });

    it('should fail to create a token if no user is found', (done) => {
        personService.create(aPerson)
            .subscribe(
                (person: IPerson) => {
                    service.create(aPerson.email, 'wrong password')
                        .subscribe(
                            t => {
                                throw Error('SECURITY RISK: Invalid token created');
                            },
                            e => done()
                        )
                }
            );
    });
});

