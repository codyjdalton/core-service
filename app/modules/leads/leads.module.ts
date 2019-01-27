// people.module.ts
import { LitModule } from '@litstack/core';
import { LeadsComponent } from './leads.component';

@LitModule({
    path: 'leads',
    exports: [
        LeadsComponent
    ],
    imports: [
    ]
})
export class LeadsModule {
    
}