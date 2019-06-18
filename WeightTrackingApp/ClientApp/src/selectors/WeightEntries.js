export default (entries, filters) => {
  
  let result = entries.filter(entry => {
      const programMatch = filters.program? entry.program.id === filters.programId : true ;
      const startDateMatch = filters.startDate? filters.startDate.isSameOrBefore(entry.date, 'day'): true;
      const endDateMatch = filters.endDate? filters.endDate.isSameOrAfter(entry.date, 'day') : true;
      return programMatch && startDateMatch && endDateMatch;
  }).slice(filters.skip, filters.limit <= filters.skip ? undefined: filters.limit); //TODO: since there are 2 calls to change state, skip is always ahead of limit. Look to change that to a single call
  
  console.log(result);
  return result;
};