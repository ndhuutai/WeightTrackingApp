import React from 'react';
import {Dropdown, Button} from "semantic-ui-react";
import { DateRangePicker } from "react-dates";


export default class Filter extends React.Component {
    
    state = {
        startDate: undefined,
        endDate: undefined,
        startDateId: 'nobody: ...',
        endDateId: 'Me: some random string',
        calendarFocused: null,
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
    
    handleOnFocusChange = focusedInput => {
        console.log(focusedInput);
        this.setState({calendarFocused: focusedInput})
    };
    
    //TODO: this should set a call up in the parent component to get all data
    handleClear = async () => {
        //setting state is async in nature. Had to await here to make sure state
        //is resetFilters
        await this.setState({
            startDate: undefined,
            endDate: undefined,
            calendarFocused: null,
            program: ''
        });
        //call to resetFilters data
        this.handleApply();
    };
    
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
                        options={this.props.programs.map(program => {
                            return {
                                key: program.id,
                                text: program.name,
                                value: program.id
                            }
                        })}
                        value={this.state.program}
                        onChange={this.handleOnChange}
                        className='col text-center'
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
                    />
                    <Button primary className='m-1 p-2' onClick={this.handleApply}>Apply</Button>
                    <Button primary negative className='m-1 p-2' onClick={this.handleClear}>Clear</Button>
                </div>
            </div>
        );
    }
}