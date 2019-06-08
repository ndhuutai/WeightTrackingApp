export const setProgram = (program) => ({
  type: 'SET_PROGRAM',
  program    
});

export const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

export const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});

export const reset = () => ({
    type: 'RESET'
});