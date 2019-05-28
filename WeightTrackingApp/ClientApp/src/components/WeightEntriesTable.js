import React from 'react';
import moment from 'moment';
import {Button, Icon} from "semantic-ui-react";

import { Link } from "react-router-dom";


export default ({entries}) => (
  <div className="table-responsive">
      <table className="table table-dark table-hover">
          <thead>
          <tr>
              <th>No.</th>
              <th>Weight</th>
              <th>Date</th>
              <th>Program</th>
              <th>Notes</th>
              <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {entries.map((entry, index) => 
              <tr key={index}>
                  <td>{entry.id}</td>
                  <td>{entry.weight}</td>
                  <td>{moment(entry.date).format('MM/DD/YYYY')}</td>
                  <td>{entry.program.name || entry.program}</td>
                  <td>{entry.note.text || entry.note}</td>
                  <td>
                      <Link to={`/weight-entry-form/${entry.id}`}>
                          <Button animated compact size="mini">
                              <Button.Content visible>Edit</Button.Content>
                              <Button.Content hidden>
                                  <Icon name="edit"/>
                              </Button.Content>
                          </Button>
                      </Link>
                  </td>
              </tr>
          )}
          </tbody>
      </table>
  </div>  
);