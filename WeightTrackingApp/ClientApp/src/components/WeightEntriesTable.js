import React from 'react';

export default ({entries}) => (
  <div>
      <table className="table table-dark">
          <thead>
          <tr>
              <th>No.</th>
              <th>Weight</th>
              <th>Date</th>
              <th>Program</th>
              <th>Notes</th>
          </tr>
          </thead>
          <tbody>
          {entries.map((entry, index) => 
              <tr key={index}>
                  <td>{entry.id}</td>
                  <td>{entry.weight}</td>
                  <td>{entry.date.format('MM/DD/YYYY')}</td>
                  <td>{entry.program}</td>
                  <td>{entry.note}</td>
              </tr>
          )}
          </tbody>
      </table>
  </div>  
);