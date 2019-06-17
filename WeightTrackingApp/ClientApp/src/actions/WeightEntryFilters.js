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