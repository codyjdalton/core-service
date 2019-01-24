// index.ts
import { LitCompiler } from '@litstack/core/dist/compiler';
import * as mongoose from 'mongoose';

import { AppConstants } from './app.constants';
import { AppModule } from './app.module';

mongoose.set('useCreateIndex', true);
mongoose.connect(
    AppConstants.DATASOURCE,
    { useNewUrlParser: true }
);

LitCompiler.bootstrap(AppModule, process.env.PORT);