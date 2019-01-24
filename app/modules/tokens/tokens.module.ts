// tokens.module.ts
import { LitModule } from '@litstack/core';
import { TokensComponent } from './tokens.component';

@LitModule({
    path: 'tokens',
    exports: [
        TokensComponent
    ],
    imports: [
    ]
})
export class TokensModule {
    
}