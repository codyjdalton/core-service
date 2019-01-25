import { expect } from 'chai';

import { TestBed, LitComponentTest } from '@litstack/core/dist/testing';

import { TokensComponent } from './tokens.component';

describe('TokensComponent', () => {

    let component: LitComponentTest;

    beforeEach(() => {
        
        component = TestBed.start(TokensComponent);
    });

    afterEach(() => {

        TestBed.stop();
    });
});
