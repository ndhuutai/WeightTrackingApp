import React from 'react';
import moment from 'moment';
import {Button, Icon} from "semantic-ui-react";
import { Link } from "react-router-dom";


export default ({entries, onDelete}) => (
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
                  <td>{index + 1 }</td>
                  <td>{entry.weight}</td>
                  <td>{moment(entry.date).format('MM/DD/YYYY')}</td>
                  <td>{entry.program.name}</td>
                  <td>{entry.note.text}</td>
                  <td>
                      <Link to={`/weight-entry-form/${entry.id}`}>
                          <Button animated compact size="tiny">
                              <Button.Content visible>Edit</Button.Content>
                              <Button.Content hidden>
                                  <Icon name="edit"/>
                              </Button.Content>
                          </Button>
                      </Link>
                      <Button animated compact size="tiny" onClick={() => onDelete(entry.id)}>
                          <Button.Content visible>Delete</Button.Content>
                          <Button.Content hidden>
                              <Icon name="delete"/>
                          </Button.Content>
                      </Button>
                  </td>
              </tr>
          )}
          </tbody>
      </table>
  </div>  
);