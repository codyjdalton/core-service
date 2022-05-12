/**
 * people.component
 */
import { LitComponent } from '@litstack/core';
import { HttpResponse, HttpRequest } from '@litstack/core/dist/http';
import { PostMapping } from '@litstack/core/dist/http/mappings';

import { ResourceComponent } from '../../common/components/resource/resource.component.class';
import { LeadService } from '../../common/services/lead.service';

@LitComponent()
export class LeadsComponent extends ResourceComponent  {

    constructor(protected mainService: LeadService) {
        super();
    }

    @PostMapping()
    createOne(req: HttpRequest, res: HttpResponse) {
        res.success(req.body, 201);
        /*this.mainService.create({
            email: req.body.email,
            name: req.body.name,
            message: req.body.message
        })
        .subscribe(
            resource => res.success(resource, 201),
            err => res.errored(400, err)
        ); */
    }
}