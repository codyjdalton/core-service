
import { HttpResponse, HttpRequest } from '@litstack/core/dist/http';
import { GetMapping, DeleteMapping, PostMapping } from '@litstack/core/dist/http/mappings';
import { Document } from "mongoose";

import { ResourceService } from '../../services/resource.service';

export abstract class ResourceComponent {

    protected mainService: ResourceService;

    /*
    protected findAll(res: HttpResponse): void {
        this.mainService.findAll()
            .subscribe((items: Document[]) => res.success(items));
    }


    protected findOne(req: HttpRequest, res: HttpResponse): void {
        this.mainService.findById(req.params.id)
            .subscribe(
                (item: Document) => res.success(item),
                () => res.errored(404)
            );
    }

    protected deleteById(req: HttpRequest, res: HttpResponse): void {
        this.mainService.deleteById(req.params.id)
            .subscribe(
                () => res.success({}, 204),
                () => res.errored(404)
            );
    } */
}