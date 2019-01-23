
import { expect } from 'chai';
import { Injector } from 'super-injector';
import { concatMap, tap } from 'rxjs/operators';

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

        service.create(aPerson.email, aPerson.password, aPerson.name)
            .subscribe(
                (result: IPerson) => {
                    expect(Boolean(result.id)).to.be.true;
                    expect(result.email).to.equal(aPerson.email);
                    expect(result.name).to.equal(aPerson.name);
                    expect(result.password).to.equal(aPerson.password);
                    done();
                }
            );
    });

    it('should allow searching for a person by email and password', (done) => {

        const testEmail: string = 'testemail@gmail.com';
        const testPass: string = 'test password';

        let anItem: IPerson;
        service.create(testEmail, testPass, 'test name')
            .pipe(
                tap((item: IPerson) => anItem = item),
                concatMap(() => service.findByEmailAndPassword(testEmail, testPass))
            )
            .subscribe(
                (results: IPerson[]) => {
                    expect(results[0].id).equals(anItem.id);
                    done();
                }
            );
    });
});

