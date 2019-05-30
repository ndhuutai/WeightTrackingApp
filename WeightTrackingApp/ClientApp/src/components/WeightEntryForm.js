import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from "react-dates";
import 'semantic-ui-css/components/dropdown.css'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import {startAddEntry, startEditEntry} from "../actions/WeightEntry";


class WeightEntryForm extends React.Component{
    
    state = {
        type: this.props.entry? 'Edit': 'Create',
        id: this.props.entry? this.props.entry.id: undefined,
        date : this.props.entry? moment(this.props.entry.date): moment(),
        note: this.props.entry? this.props.entry.note.text: '',
        weight: this.props.entry? this.props.entry.weight: '',
        program: this.props.entry? this.props.entry.program.name: '',
        calendarFocused: false
    };
    //TODO: add actions and reducers to send submitted form data to store and send the same data to web api

    onSubmit = (e) => {
        e.preventDefault();
        
        if(this.state.type === 'Create') {
            this.props.startAddEntry({
                date: this.state.date,
                weight: e.target.weight.value,
                program: e.target.program.value,
                note: e.target.note.value
            });
        } else {
            this.props.startEditEntry({
                id : this.props.entry.id,
                date: this.state.date,
                weight: e.target.weight.value,
                program: e.target.program.value,
                note: e.target.note.value
            })
        }
        
        this.props.history.replace('/weight-data');
    };
    
    handleOnDateChange = (date) => this.setState({ date });
    handleOnFocusedChange = ({ focused }) => this.setState({ calendarFocused: focused });
    

    render() {
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="form-group col">
                            <label htmlFor="weight">Weight</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="weight" 
                                name="weight" 
                                defaultValue={this.state.weight}
                                placeholder="Weight"/>
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
                                    isOutsideRange = {() => false}
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="row justify-content-center">
                        <div className="form-group col">
                            <label >Note</label>
                            <textarea  className="form-control" name="note" placeholder="Add your notes" defaultValue={this.state.note}/>
                        </div>
                        <div className="form-group col">
                            <label>Program</label>
                            <input type="text" className="form-control" name="program" placeholder="Add your program" defaultValue={this.state.program}/>
                        </div>
                    </div>
                    
                    <button className="btn btn-primary" type="submit">{this.state.type}</button>
                </form>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({startAddEntry, startEditEntry},dispatch);

const mapStateToProps = (state, props) => {
    console.log('fired');
    return {
        entry: state.entries.find(entry => entry.id == props.match.params.id) // probably need to redo model or parse to make this strongly-typed
    }
    
};

export default connect(mapStateToProps,mapDispatchToProps)(WeightEntryForm);