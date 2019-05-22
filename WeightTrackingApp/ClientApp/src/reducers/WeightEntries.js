const defaultState = [];


export default (defaultState, action) => {
    switch (action.type) {
        case 'ADD_ENTRY':
            return [
                ...state,
                action.entry
            ]
    }
}