import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from "react-dates";
import 'semantic-ui-css/components/dropdown.css'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {Form, Field} from 'react-final-form';


import {startAddEntry, startEditEntry} from "../actions/WeightEntry";


class WeightEntryForm extends React.Component{
    
    state = {
        //populate data when entry editing existing entry
        type: this.props.entry? 'Edit': 'Create',
        calendarFocused: false,
        entry: {
            id: this.props.entry? this.props.entry.id: undefined,
            date : this.props.entry? moment(this.props.entry.date): moment(),
            note: this.props.entry? this.props.entry.note.text: '',
            weight: this.props.entry? this.props.entry.weight: '',
            program: this.props.entry? this.props.entry.program.name: ''
        }
    };
    //TODO: add actions and reducers to send submitted form data to store and send the same data to web api

    onSubmitNewFormType = (record) => {
        console.log(this.state.entry.date);
        //an object containing values from final form
        let entry = {
            date: record.date,
            weight: record.weight,
            program: record.program,
            note: record.note
        };

        if(this.state.type === 'Create') {
            this.props.startAddEntry({
                ...entry
            });
        } else {
            this.props.startEditEntry({
                ...entry,
                id: this.state.entry.id
            })
        }

        this.props.history.replace('/weight-data');
    };
    
    handleOnDateChange = (date) => this.setState({ date });
    handleOnFocusedChange = ({ focused }) => this.setState({ calendarFocused: focused });
    
    
    mustBeNumber = value => 
        isNaN(value)?`Should be a number`: undefined;
    
    required = value => value? undefined: 'Requires a program';

    render() {
        return(
            <div>
                <Form
                    onSubmit={this.onSubmitNewFormType}
                    initialValues = {this.state.entry}
                    render={({ handleSubmit, pristine, invalid }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="form-group col">
                                    <Field name="weight"
                                           validate={this.mustBeNumber}
                                    >
                                        {({ input, meta}) => (
                                            <div>
                                                <label>Weight</label>
                                                <input
                                                    type="text"
                                                    {...input}
                                                    className="form-control form-control-lg"
                                                    // defaultValue={this.state.weight}
                                                    placeholder="Weight"/>
                                                {meta.touched 
                                                && meta.error 
                                                && <div className="alert alert-danger">{meta.error}</div>}
                                            </div>
                                        )}
                                    </Field>
                                </div>
                                <div className="form-group col">
                                    <Field name="date">
                                        {({input}) => (
                                            <div>
                                                <label>Date:</label>
                                                <div>
                                                    <SingleDatePicker
                                                        block={true}
                                                        date={input.value}
                                                        onDateChange={this.handleOnDateChange}
                                                        focused={this.state.calendarFocused}
                                                        onFocusChange={this.handleOnFocusedChange}
                                                        numberOfMonths = {1}
                                                        isOutsideRange = {() => false}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </Field>
                                </div>
                            </div>

                            <div className="row justify-content-center">
                                    <Field name="note">
                                        {({input, meta}) => (
                                            <div className="form-group col">
                                                <label >Note</label>
                                                <textarea {...input} 
                                                          className="form-control" 
                                                          placeholder="Add your notes"/>
                                            </div>
                                        )}
                                    </Field>
                                <Field name="program" validate={this.required}>
                                    {({input, meta}) => (
                                        <div className="form-group col">
                                            <label>Program</label>
                                            <input type="text" {...input} 
                                                   className="form-control"  
                                                   placeholder="Add your program"/>
                                            {meta.touched 
                                            && meta.error 
                                            && <div className='alert alert-danger'>{meta.error}</div>}
                                        </div>
                                    )}
                                </Field>
                            </div>

                            <button className="btn btn-primary" type="submit">{this.state.type}</button>
                        </form>
                    )}
                />
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => bindActionCreators({startAddEntry, startEditEntry},dispatch);

const mapStateToProps = (state, props) => {
    return {
        entry: state.entries.find(entry => entry.id == props.match.params.id) // implicitly convert since one is number and the other is string
    }
    
};

export default connect(mapStateToProps,mapDispatchToProps)(WeightEntryForm);