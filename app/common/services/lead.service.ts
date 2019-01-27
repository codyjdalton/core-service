/**
 * lead.service
 */
import { LitService } from '@litstack/core';
import { from, Observable, throwError } from 'rxjs';

import * as uuid from 'uuid';

import { Lead, ILead } from '../../common/models/lead.model';
import { ResourceService } from './resource.service';

import { truncate } from '../utils/string.util';

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
        const aLead: ILead = new Lead({
            id: uuid.v4(),
            email: truncate(params.email, 200),
            name: truncate(params.name, 200),
            message: truncate(params.message, 400)
        });

        return from(aLead.save());
    }
}