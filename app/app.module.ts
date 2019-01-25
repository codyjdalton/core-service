// app.module.ts
import { LitModule } from '@litstack/core';

import { AppComponent } from './app.component';
import { MiddlewaresModule } from './middlewares/middlewares.module';
import { PeopleModule } from './modules/people/people.module';
import { TokensModule } from './modules/tokens/tokens.module';

@LitModule({
    exports: [
        AppComponent
    ],
    imports: [
        MiddlewaresModule,
        PeopleModule,
        TokensModule,
    ]
})
export class AppModule {

}