#!/usr/bin/env node
import { Env } from '../lib/defines/appOption';

const generator = require('../lib/index');
generator.run({ port: 6200, env: (process.env.NODE_ENV as Env) ?? 'production' });
