/**
 * lead.service
 */
import { LitService } from '@litstack/core';
import { from, Observable, throwError } from 'rxjs';

import * as uuid from 'uuid';

import { Lead, ILead } from '../../common/models/lead.model';
import { ResourceService } from './resource.service';

@LitService()
export class LeadService extends ResourceService {

    public model = Lead;

    /**
     * @method create
     * @param {{ email: string; name: string; message: string; }}
     */
    public create(params: {
        email: string;
        name: string
        message: string;
    }): Observable<ILead> {
        /**
         * @TODO find out why this needs to be any
         * for heroku success
         */
        const aLead: any = new Lead({
            id: uuid.v4(),
            email: params.email,
            name: params.name,
            message: params.message
        });

        return from(aLead.save());
    }
}