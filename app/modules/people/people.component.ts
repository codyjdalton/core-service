/**
 * people.component
 */
import { LitComponent } from '@litstack/core';
import { HttpResponse, HttpRequest } from '@litstack/core/dist/http';
import { PostMapping } from '@litstack/core/dist/http/mappings';

import { PersonService } from '../../common/services/person.service';
import { ResourceComponent } from '../../common/components/resource/resource.component.class';
import { IPerson } from '../../common/models/person.model';

@LitComponent()
export class PeopleComponent  {

    constructor(protected mainService: PersonService) {
        // super();
    }

    @PostMapping()
    createOne(req: HttpRequest, res: HttpResponse) {
        this.mainService.create({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        })
        .subscribe(
            person => res.success(person, 201),
            err => res.errored(400, err)
        );
    }
}