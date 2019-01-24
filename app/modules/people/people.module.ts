// people.module.ts
import { LitModule } from '@litstack/core';
import { PeopleComponent } from './people.component';

@LitModule({
    path: 'people',
    exports: [
        PeopleComponent
    ],
    imports: [
    ]
})
export class PeopleModule {
    
}