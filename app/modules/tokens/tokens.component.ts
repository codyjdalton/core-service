/**
 * tokens.component
 */
import { LitComponent } from '@litstack/core';
import { HttpResponse, HttpRequest } from '@litstack/core/dist/http';
import { PostMapping, GetMapping } from '@litstack/core/dist/http/mappings';

import { TokenService } from '../../common/services/token.service';

@LitComponent()
export class TokensComponent  {

    constructor(private tokenService: TokenService) {
    }

    @GetMapping()
    launch(req: HttpRequest, res: HttpResponse) {

        const email: string = req.query.email;
        const password: string = req.query.password;
        
        this.tokenService.create(email, password)
            .subscribe(
                (token: string) => {
                    res.success({
                        jwt: token
                    });
                },
                err => res.errored(400)
            );
    }
}