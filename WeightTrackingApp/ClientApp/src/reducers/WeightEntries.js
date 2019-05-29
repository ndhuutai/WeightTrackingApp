const defaultState = [];


export default (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_ENTRY':
            return [
                ...state,
                action.entry
            ];
        case 'EDIT_ENTRY':
            let test = state.map(entry => {
                console.log(entry);
                console.log(action.entry);
                if(entry.id === action.entry.id) {
                    return action.entry
                }
                return entry;
            });
            console.log(test);
            return test;
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