// Runs before all tests to set up the environment.
import { beforeEach } from 'vitest';
import { resetCounters } from './utils';

beforeEach(() => {
    resetCounters();
});
