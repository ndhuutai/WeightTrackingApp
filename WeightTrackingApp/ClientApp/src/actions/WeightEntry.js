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

export const editEntry = ({id, weight, note, date, program}) => ({
    type: 'EDIT_ENTRY',
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

export const deleteEntry = (id) => ({
   type: 'DELETE_ENTRY',
   id 
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

export const startEditEntry = ({id, weight, note, date, program}) => {
    console.log(id, weight, note , program);
    return async (dispatch) => {
        let response = await axios.put('/api/weightentries', {
            id,
            weight,
            note: {
                text: note
            },
            date,
            program: {
                name: program
            }
        });
        dispatch(editEntry({id, weight, note, date, program}));
    }
};

export const startDeleteEntry = (id) => {
    return async (dispatch) => {
        await axios.delete(`/api/weightentries/${id}`, {
            method: 'delete',
        });
        
        dispatch(deleteEntry(id));
    }
};



