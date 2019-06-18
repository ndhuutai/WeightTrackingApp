export const setProgramFilter = (programId = '') => ({
  type: 'SET_PROGRAM',
  programId    
});

export const setStartDate = (startDate = '') => ({
    type: 'SET_START_DATE',
    startDate
});

export const setEndDate = (endDate = '') => ({
    type: 'SET_END_DATE',
    endDate
});

export const resetFilters = () => ({
    type: 'RESET'
});

export const setLimit = (limit = 5) => ({
    type: 'SET_LIMIT',
    limit
});

export const setSkip = (skip = 0) => ({
    type: 'SET_SKIP',
    skip
});

export const setTake = (take = 5) => ({
    type: 'SET_TAKE',
    take
});

export const setSkipAndTake = (skip) => {
    return (dispatch, getState)  => {
        dispatch(setSkip(skip));
        dispatch(setTake(skip + getState().filters.limit));
    }
};