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

    @PostMapping()
    launch(req: HttpRequest, res: HttpResponse) {

        const email: string = req.body.email;
        const password: string = req.body.password;
        
        this.tokenService.create(email, password)
            .subscribe(
                (token: string) => {
                    res.success({
                        jwt: token
                    }, 201);
                },
                (e: string) => res.errored(400, { message: e })
            );
    }
}