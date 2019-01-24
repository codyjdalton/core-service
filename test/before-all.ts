import * as mongoose from 'mongoose';

import { SpecConstants } from '../app/spec.constants';

mongoose.set('useCreateIndex', true);

mongoose.connect(
    SpecConstants.DATASOURCE_INTEG,
    { useNewUrlParser: true }
);