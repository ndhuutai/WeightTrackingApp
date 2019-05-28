import axios from 'axios';

//add data to payload
export const addEntry = ({id, weight, note, date, program}) => ({
    type: 'ADD_ENTRY',
    entry: {
        id,
        weight,
        note,
        date,
        program
    }
});

export const setEntries = (entries) => ({
    type: 'SET_ENTRIES',
    entries
});

export const setCurrentEntry = (entry) => ({
   type: 'SET_CURRENT_ENTRY',
   entry 
});

export const startAddEntry = ({weight, note, date, program}) => {
    return async (dispatch) => {
        let response = await axios.post('/api/weightentries', {
            weight,
            note: {
                text: note
            },
            date,
            program: {
                name: program
            }
        });

        dispatch(addEntry({id : response.data.id, weight, note, date, program}));
    }
};