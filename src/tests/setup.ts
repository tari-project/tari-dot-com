// Runs before all tests to set up the environment.
import { afterEach, beforeEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { resetCounters } from './utils';

afterEach(cleanup);

beforeEach(() => {
    resetCounters();
});
