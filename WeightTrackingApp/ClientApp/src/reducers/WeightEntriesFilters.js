const defaultState = {
  program: undefined,
  startDate: undefined,
  endDate: undefined
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_PROGRAM':
            return {
                ...state,
                program: action.program
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'RESET':
            return {
                program: undefined,
                startDate: undefined,
                endDate: undefined
            };
        default:
            return state;
    }
};