export default (entries, filters) => {
  return entries.filter(entry => {
      const programMatch = filters.program? entry.program === filters.program : true ;
      const startDateMatch = filters.startDate? filters.startDate.isSameOrBefore(entry.date, 'day'): true;
      const endDateMatch = filters.endDate? filters.endDate.isSameOrAfter(entry.date, 'day') : true;
      return programMatch && startDateMatch && endDateMatch;
  });  
};