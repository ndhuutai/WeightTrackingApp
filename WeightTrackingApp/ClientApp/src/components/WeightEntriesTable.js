import React from 'react';
import moment from 'moment';
import {Button, Icon, Table} from "semantic-ui-react";
import { Link } from "react-router-dom";


export default class WeightEntriesTable extends React.Component {
    
    state = {
        column : null,
        tableData : this.props.entries,
        direction: null
    };
    
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            tableData: nextProps.entries
        })
    }

    handleSort = clickedColumn => () => {
      const { column, tableData, direction} = this.state;
      
      if( column !== clickedColumn) {
          this.setState(() => ({
              column: clickedColumn,
              tableData: tableData.sort((a, b) => {
                  //TODO: this is not dynamic, only sorts by program's name
                  if(a[clickedColumn].name < b[clickedColumn].name){
                      return -1;
                  }
                  if(a[clickedColumn].name === b[clickedColumn].name){
                      return 0;
                  }
                  return 1;
              }),
              direction: 'ascending'
          }));
      }
      
      this.setState({
          tableData: tableData.reverse(),
          direction: direction === 'ascending'? 'descending': 'ascending'
      });
    };
    
    render() {
        return (
            <Table sortable celled textAlign='center' inverted verticalAlign='middle' unstackable striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>No.</Table.HeaderCell>
                        <Table.HeaderCell>Weight</Table.HeaderCell>
                        <Table.HeaderCell>Date</Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={this.state.column === 'program'? this.state.direction: null}
                            onClick={this.handleSort('program')}
                        >
                            Program
                        </Table.HeaderCell>
                        <Table.HeaderCell>Notes</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.tableData.map((entry, index) =>
                        <Table.Row key={index}>
                            <Table.Cell>{index + 1 }</Table.Cell>
                            <Table.Cell>{entry.weight}</Table.Cell>
                            <Table.Cell>{moment(entry.date).format('MM/DD/YYYY')}</Table.Cell>
                            <Table.Cell>{entry.program.name}</Table.Cell>
                            <Table.Cell>{entry.note.text}</Table.Cell>
                            <Table.Cell>
                                <Link to={`/weight-entry-form/${entry.id}`}>
                                    {/*<Button animated compact size="tiny">*/}
                                    {/*    <Button.Content visible>Edit</Button.Content>*/}
                                    {/*    <Button.Content hidden>*/}
                                    {/*        <Icon name="edit"/>*/}
                                    {/*    </Button.Content>*/}
                                    {/*</Button>*/}
                                    <Button>Edit</Button>
                                </Link>
                                    {/*<Button animated compact size="tiny" onClick={() => this.props.onDelete(entry.id)}>*/}
                                    {/*    <Button.Content visible>Delete</Button.Content>*/}
                                    {/*    <Button.Content hidden>*/}
                                    {/*        <Icon name="delete"/>*/}
                                    {/*    </Button.Content>*/}
                                    {/*</Button>*/}
                                    <Button onClick={() => this.props.onDelete(entry.id)}>Delete</Button>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        );
    }
}
    
    
    
      