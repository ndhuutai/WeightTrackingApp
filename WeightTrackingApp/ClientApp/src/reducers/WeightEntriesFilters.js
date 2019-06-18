const defaultState = {
    program: '',
    startDate: '',
    endDate: '',
    limit: 5,
    skip: 0,
    take: 5
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_PROGRAM':
            return {
                ...state,
                programId: action.programId
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };
        case 'SET_LIMIT':
            return {
                ...state,
                limit: action.limit
            };
        case 'SET_SKIP':
            return {
                ...state,
                skip: action.skip
            };
        case 'SET_TAKE':
            return {
                ...state,
                take: action.take
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