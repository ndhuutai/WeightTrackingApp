export const AddEntry = ({weight, notes, date, program}) => ({
    type: 'ADD_ENTRY',
    entry: {
        weight,
        notes,
        date,
        program
    }
});