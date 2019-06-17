export const setProgramFilter = (program = '') => ({
  type: 'SET_PROGRAM',
  program    
});

export const setStartDate = (startDate = undefined) => ({
    type: 'SET_START_DATE',
    startDate
});

export const setEndDate = (endDate = undefined) => ({
    type: 'SET_END_DATE',
    endDate
});

export const resetFilters = () => ({
    type: 'RESET'
});