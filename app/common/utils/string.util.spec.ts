import { expect } from 'chai';
import * as uuid from 'uuid';

import { truncate } from './string.util';

describe('Util:String', () => {

    it('should truncate longer text', () => {

        const inputLong = uuid.v4();
        const inputShort = 'hi';


        expect(truncate(inputLong, 10)).not.to.equal(inputLong);
        expect(truncate(inputShort, 10)).to.equal(inputShort);
    });
});