const defaultState = [];


export default (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_ENTRY':
            return [
                ...state,
                action.entry
            ]
        default:
            return [
                ...state
            ]
    }
}