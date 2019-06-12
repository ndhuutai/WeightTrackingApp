import React from 'react';
import {Dropdown, Button} from "semantic-ui-react";
import { DateRangePicker } from "react-dates";


export default class Filter extends React.Component {
    
    state = {
        startDate: undefined,
        endDate: undefined,
        startDateId: 'nobody: ...',
        endDateId: 'Me: some random string',
        calendarFocused: false,
        program: ''
    };
    
    handleOnChange = (e, data) => {
        //getting the id from the selected program and pass it up
        this.setState({
            program: data.value
        })
    };
    
    handleOnDatesChange = ({ startDate, endDate }) => {
        this.setState({startDate, endDate})
    };
    
    handleOnFocusChange = focusedInput => this.setState({calendarFocused: focusedInput});
    
    //TODO: this should set a call up in the parent component to get all data
    handleClear = () => this.setState({
        startDate: undefined,
        endDate: undefined,
        calendarFocused: false,
        program: ''
    });
    
    handleApply = () => {
        this.props.applyFilters({
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            program: this.state.program
        })
    };
    
    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <Dropdown
                        placeholder="Select program"
                        selection
                        search
                        noResultsMessage='No result found'
                        clearable
                        options={this.props.programs.map(program => {
                            return {
                                key: program.id,
                                text: program.name,
                                value: program.id
                            }
                        })}
                        onChange={this.handleOnChange}
                        className='col'
                    />
                    <DateRangePicker
                        startDate={this.state.startDate}
                        startDateId={this.state.startDateId}
                        endDate={this.state.endDate}
                        endDateId={this.state.endDateId}
                        onDatesChange={this.handleOnDatesChange}
                        focusedInput={this.state.calendarFocused}
                        onFocusChange={this.handleOnFocusChange}
                        isOutsideRange={() => false}
                        className='col'
                    />
                    <Button primary className='m-1 p-2' onClick={this.handleApply}>Apply</Button>
                    <Button primary negative className='m-1 p-2' onClick={this.handleClear}>Clear</Button>
                </div>
            </div>
        );
    }
}