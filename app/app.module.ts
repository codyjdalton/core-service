// app.module.ts
import { LitModule } from '@litstack/core';

import { AppComponent } from './app.component';

// middlewares
import { MiddlewaresModule } from './middlewares/middlewares.module';

// resource modules
import { PeopleModule } from './modules/people/people.module';
import { TokensModule } from './modules/tokens/tokens.module';
import { LeadsModule } from './modules/leads/leads.module';

@LitModule({
    exports: [
        AppComponent
    ],
    imports: [
        MiddlewaresModule,
        PeopleModule,
        TokensModule,
        LeadsModule,
    ]
})
export class AppModule {

}