const defaultState = [];

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_PROGRAMS':
            return [
                ...action.programs
            ];
        default:
            return state;
    }
}