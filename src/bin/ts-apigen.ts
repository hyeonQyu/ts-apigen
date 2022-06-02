#!/usr/bin/env node
import { Env } from '../lib/defines/appOption';
import { Default } from '../lib/defines/default';

const generator = require('../lib/index');
generator.run({ port: Default.PORT, env: (process.env.NODE_ENV as Env) ?? 'production' });
