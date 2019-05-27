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

export const startAddEntry = ({weight, note, date, program}) => {
    return async (dispatch) => {
        let response = await axios.post('/api/weightentries', {
            weight,
            note: {
                text: note
            },
            dateTime: date,
            program: {
                name: program
            }
        });

        dispatch(addEntry({id : response.data.id, weight, note, date, program}));
    }
};