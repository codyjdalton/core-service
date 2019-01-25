import { expect } from 'chai';

import { TestBed, LitComponentTest } from '@litstack/core/dist/testing';

import { TokensComponent } from './tokens.component';
import { PersonService } from '../../common/services/person.service';
import { Injector } from 'super-injector';
import { IPerson, Person } from '../../common/models/person.model';

describe('TokensComponent', () => {

    let component: LitComponentTest;
    let personService: PersonService;

    const aPerson = {
        email: 'testemail@gmail.com',
        name: 'test user',
        password: 'secret-key'
    };

    beforeEach(() => {
        component = TestBed.start(TokensComponent);
        personService = Injector.resolve(PersonService);
    });

    afterEach((done) => {
        Person.deleteMany({})
            .then(() => {
                TestBed.stop();
                done();
            });
    });

    it('should return a valid token using valid credentials', (done) => {
        personService.create(aPerson)
            .subscribe(
                () => {
                    component.post('/')
                        .send({ email: aPerson.email, password: aPerson.password })
                        .expect(201)
                        .end((err, res) => {
                            if (err) return done(err);
                            done();
                        });
                }
            );
    });


    it('should return an error given invalid credentials', (done) => {
        personService.create(aPerson)
            .subscribe(
                () => {
                    component.post('/')
                        .send({ email: aPerson.email, password: 'wrong password' })
                        .expect(400)
                        .expect((res) => {
                            expect(Boolean(res.body.message)).to.be.true;
                        })
                        .end((err, res) => {
                            if (err) return done();
                            done('');
                        });
                }
            );
    });
});
