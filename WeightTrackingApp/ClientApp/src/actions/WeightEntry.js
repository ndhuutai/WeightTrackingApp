export const AddEntry = ({weight, notes, date, program}) => ({
    type: 'ADD_ENTRY',
    weight,
    notes,
    date,
    program
});