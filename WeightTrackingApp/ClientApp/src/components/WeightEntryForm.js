import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from "react-dates";
import { Input } from "semantic-ui-react";
import 'semantic-ui-css/components/dropdown.css'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import {startAddEntry} from "../actions/WeightEntry";


const dummySelections = [
    {key: 'program1', value: 'program1', text:'program 1'},
    {key: 'program2', value: 'program2', text:'program 2'},
    {key: 'program3', value: 'program3', text:'program 3'},
    {key: 'program4', value: 'program4', text:'program 4'},
];
    

class WeightEntryForm extends React.Component{
    
    state = {
        date : moment(),
        calendarFocused: false,
        size: undefined,
        entry: undefined
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
        this.props.startAddEntry({
            date: this.state.date,
            weight: e.target.weight.value,
            program: e.target.program.value,
            note: e.target.note.value
        });
        this.props.history.replace('/weight-data');
    };
    
    handleOnDateChange = (date) => this.setState({ date });
    handleOnFocusedChange = ({ focused }) => this.setState({ calendarFocused: focused });
    
    handleOnDropDownChange = (e, {value}) => {
      console.log(value);
    };
    
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
                    
                    <div className="row justify-content-center">
                        <div className="form-group col">
                            <label >Note</label>
                            <textarea  className="form-control" name="note" placeholder="Add your notes"/>
                        </div>
                        <div className="form-group col">
                            <label>Program</label>
                            
                            {/*<Dropdown*/}
                            {/*    placeholder="Select Program"*/}
                            {/*    fluid*/}
                            {/*    search*/}
                            {/*    selection*/}
                            {/*    options={dummySelections}*/}
                            {/*    onChange={this.handleOnDropDownChange}*/}
                            {/*/>*/}
                            <input type="text" className="form-control" name="program" placeholder="Add your program"/>
                        </div>
                        
                    </div>
                    
                    
                    <button className="btn btn-primary" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({startAddEntry},dispatch);

const mapStateToProps = (state) => ({
    entries: state.entries
});

export default connect(mapStateToProps,mapDispatchToProps)(WeightEntryForm);