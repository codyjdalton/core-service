
import { expect } from 'chai';
import { Injector } from 'super-injector';
import { concatMap, tap } from 'rxjs/operators';

import { NotificationService } from './notification.service';
import { of } from 'rxjs';

describe('Service:NotificationService', () => {

    let service: MockNotificationService;

    class MockNotificationService extends NotificationService {

        public mailProvider: any = new class {
            send(info: any) {
                return of(info);
            }
        };
    }

    beforeEach(() => {

        service = Injector.resolve(MockNotificationService);
    });

    it('should send mail', (done) => {
        service.sendMail()
            .subscribe(
                result => {
                    expect(Boolean(result.to)).to.be.true;
                    expect(Boolean(result.from)).to.be.true;
                    expect(Boolean(result.subject)).to.be.true;
                    done();
                }
            );
    });
});

