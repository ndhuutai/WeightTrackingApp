const defaultState = [];

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_ENTRY':
            return [
                ...state,
                {
                    id : action.entry.id,
                    weight: action.entry.weight,
                    note: {
                        text: action.entry.note
                    },
                    date: action.entry.date,
                    program: {
                        name: action.entry.program
                    }
                }
            ];
        case 'EDIT_ENTRY':
            return state.map(entry => {
                if(entry.id === action.entry.id) {
                    return {
                        id : action.entry.id,
                        weight: action.entry.weight,
                        note: {
                            text: action.entry.note
                        },
                        date: action.entry.date,
                        program: {
                            name: action.entry.program
                        }
                    }
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