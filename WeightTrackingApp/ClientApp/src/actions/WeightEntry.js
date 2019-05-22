//add data to payload
export const addEntry = ({weight, notes, date, program}) => ({
    type: 'ADD_ENTRY',
    entry: {
        weight,
        notes,
        date,
        program
    }
});