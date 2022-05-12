// index.ts
import { LitCompiler } from '@litstack/core/dist/compiler';
import * as mongoose from 'mongoose';

import { AppConstants } from './app.constants';
import { AppModule } from './app.module';
/*
mongoose.connect(
    AppConstants.DATASOURCE
); */

LitCompiler.bootstrap(AppModule, process.env.PORT);