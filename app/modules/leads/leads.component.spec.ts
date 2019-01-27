import { expect } from 'chai';

import { TestBed, LitComponentTest } from '@litstack/core/dist/testing';
import { Lead } from '../../common/models/lead.model';

import { LeadsComponent } from './leads.component';

describe('LeadsComponent', () => {

    let component: LitComponentTest;

    const aLead = {
        email: 'testemail@gmail.com',
        name: 'test user',
        message: 'my message'
    };

    beforeEach(() => {
        component = TestBed.start(LeadsComponent);
    });

    afterEach((done) => {
        Lead.deleteMany({})
            .then(() => {
                TestBed.stop();
                done();
            });
    });

    it('should allow creating a lead', (done) => {

        component.post('/')
            .send(aLead)
            .expect(201)
            .expect((res) => {
                expect(Boolean(res.body.id)).to.equal(true);
                expect(res.body.email).to.equal(aLead.email);
                expect(res.body.name).to.equal(aLead.name);
                expect(res.body.message).to.equal(aLead.message);
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }

                done();
            });
    });

    it('should not return a lead if lead creation fails', (done) => {

        component.post('/')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }

                done();
            });
    });
});
