import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from "react-dates";


export default class WeightEntryForm extends React.Component{
    
    state = {
        date : moment(),
        calendarFocused: false
    };
    
    onSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.weight.value);
        console.log(e.target.notes.value);
    };
    
    handleOnDateChange = (date) => this.setState({ date });
    handleOnFocusedChange = ({ focused }) => this.setState({ calendarFocused: focused })
    
    render() {
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="form-group col">
                            <label htmlFor="weight">Weight</label>
                            <input type="text" className="form-control" id="weight" name="weight" placeholder="Weight"/>
                        </div>
                        <div className="form-group col">
                            <label >Notes</label>
                            <textarea  className="form-control" name="notes" placeholder="Add your notes"/>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label>Date:</label>
                    </div>
                    <div className="form-group">
                        <SingleDatePicker
                            date={this.state.date}
                            onDateChange={this.handleOnDateChange}
                            focused={this.state.calendarFocused}
                            onFocusChange={this.handleOnFocusedChange}
                            numberOfMonths = {1}
                        />
                    </div>
                    <button className="btn btn-primary" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}