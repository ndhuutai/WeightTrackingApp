import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from "react-dates";


export default class WeightEntryForm extends React.Component{
    
    state = {
        date : moment(),
        calendarFocused: false,
        size: undefined
    };
    //TODO: add actions and reducers to send submitted form data to store and send the same data to web api
    componentDidMount() {
        window.onresize = this.resize;
    }
    
    resize = () => {
        console.log(document.getElementById('weight').offsetHeight);
    };

    onSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.weight.value);
        console.log(e.target.notes.value);
        console.log(parseFloat(getComputedStyle(e.target).fontSize));
        this.props.history.push('/weight-data');
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
                            <input type="text" className="form-control form-control-lg" id="weight" name="weight" placeholder="Weight"/>
                        </div>
                        <div className="form-group col">
                            <label>Date:</label>
                            <div>
                                <SingleDatePicker
                                    block={true}
                                    date={this.state.date}
                                    onDateChange={this.handleOnDateChange}
                                    focused={this.state.calendarFocused}
                                    onFocusChange={this.handleOnFocusedChange}
                                    numberOfMonths = {1}
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label >Notes</label>
                        <textarea  className="form-control" name="notes" placeholder="Add your notes"/>
                    </div>
                    <button className="btn btn-primary" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}