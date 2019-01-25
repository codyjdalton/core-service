import { expect } from 'chai';

import { TestBed, LitComponentTest } from '@litstack/core/dist/testing';

import { PeopleComponent } from './people.component';
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
        component = TestBed.start(PeopleComponent);
        personService = Injector.resolve(PersonService);
    });

    afterEach((done) => {
        Person.deleteMany({})
            .then(() => {
                TestBed.stop();
                done();
            });
    });

    it('should create a person if all fields are included', (done) => {

        component.post('/')
            .send(aPerson)
            .expect(201)
            .expect((req) => {
                expect(req.body.id).to.not.be.undefined;
                expect(req.body.email).to.equal(aPerson.email);
            })
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });

    it('should create a person required fields are missing', (done) => {
        component.post('/')
            .expect(400)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });
});
