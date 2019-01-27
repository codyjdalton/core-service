
import { expect } from 'chai';
import { Injector } from 'super-injector';
import { concatMap, tap } from 'rxjs/operators';

import { Lead, ILead } from '../../common/models/lead.model';
import { LeadService } from './lead.service';

describe('Service:LeadService', () => {

    let service: LeadService;
    const aLead = {
        name: 'test name',
        email: 'testemail@gmail.com',
        message: 'Hello this is a test message'
    };

    beforeEach(() => {

        service = Injector.resolve(LeadService);
    });

    afterEach((done) => {
        Lead.deleteMany({})
            .then(() => {
                done();
            });
    });

    it('should create a new lead if input is valid', (done) => {
        service.create(aLead)
            .subscribe(
                (newLead: ILead) => {
                    
                    if(!newLead) {
                        done(new Error('Unable to create lead'));
                    }

                    // make sure lead made it to db
                    service.findById(newLead.id)
                        .subscribe(
                            (testLead: ILead) => {
                                if(!testLead) {
                                    done(new Error('Unable to find created lead'));
                                }

                                done();
                            }
                        ); 
                },
                () => done(new Error('Unable to persist new lead'))
            );
    });

    it('should not create a new lead if input is invalid', (done) => {
        service.create({
            name: aLead.name,
            email: aLead.email,
            message: null
        })
        .subscribe(
            (newLead: ILead) => {
                done(new Error('Created invalid lead'));
            },
            err => done()
        );
    });
});

