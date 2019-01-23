
import { expect } from 'chai';
import { Injector } from 'super-injector';

import { Person, IPerson } from '../../common/models/person.model';
import { PersonService } from './person.service';

describe('Service:PersonService', () => {

    let service: PersonService;

    beforeEach(() => {

        service = Injector.resolve(PersonService);
    });

    afterEach((done) => {

        Person.deleteMany({})
            .then(() => {
                done();
            });
    });

    it('should create a new person', (done) => {

        const aPerson = {
            email: 'testemail@gmail.com',
            name: 'test user',
            password: 'secret-key'
        };

        service.create(aPerson.email, aPerson.name, aPerson.password)
            .subscribe(
                (result: IPerson) => {
                    expect(Boolean(result.id)).to.be.true;
                    expect(result.email).to.equal(aPerson.email);
                    expect(result.name).to.equal(aPerson.name);
                    expect(result.password).to.equal(aPerson.password);
                }
            );
    });
});

