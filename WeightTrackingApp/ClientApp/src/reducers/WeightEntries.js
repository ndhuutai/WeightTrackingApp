const defaultState = [];


export default (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_ENTRY':
            return [
                ...state,
                action.entry
            ];
        case 'EDIT_ENTRY':
            return state.map(entry => {
                if(entry.id === action.entry.id) {
                    return action.entry
                }
                return entry;
            });
        case 'DELETE_ENTRY':
            return state.filter(entry => entry.id !== action.id);
        case 'SET_ENTRIES':
            return [
                ...action.entries
            ]
        default:
            return [
                ...state
            ]
    }
}