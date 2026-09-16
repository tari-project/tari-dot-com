let _COUNTERS: { [key: string]: number } = {};

// Gets the next number in a namespace. Starts counting at whatever value is provided,
// if there is not currently a value. Useful for factories.
export const nextCount = (nameSpace: string, startAt = 1): number => {
    if (_COUNTERS[nameSpace] === undefined) {
        _COUNTERS[nameSpace] = startAt - 1;
    }
    _COUNTERS[nameSpace] += 1;
    return _COUNTERS[nameSpace];
};

// Should be called after every test, globally.
export const resetCounters = () => {
    _COUNTERS = {};
};
