import React from 'react';
import {connect} from "react-redux";
import {Icon, Label} from "semantic-ui-react";
import axios from 'axios';
import WeightEntriesTable from "./WeightEntriesTable";
import {bindActionCreators} from "redux";
import {setEntries, startDeleteEntry} from "../actions/WeightEntry";
import { setPrograms } from '../actions/Program';

import Filter from './Filter';


class WeighData extends React.Component {

    componentDidMount() {
        //if there's currently no entry in redux state
        axios.get('/api/weightentries')
            .then(response => this.props.setEntries(response.data))
            .catch(err => console.log(err));
        
        axios.get('/api/programs')
            .then(response => this.props.setPrograms(response.data))
            .catch(err => console.log(err));
    }

    onClick = () => {
        this.props.history.push('/weight-entry-form');
    };

    //getting the id from the table
    handleOnDelete = (id) => {
        this.props.startDeleteEntry(id);
    };
    
    handleApplyFilters = ({program, startDate, endDate}) => {
        if(program) {
            axios.get(`/api/weightentries/program/${program}?${startDate?`startDate=${startDate.format()}`:''}${endDate?`&endDate=${endDate.format()}`:''}`)
                .then(response => this.props.setEntries(response.data))
                .catch(err => console.log(err));
        } else if(!program && (startDate || endDate)) {
            axios.get(`/api/weightentries/bydate?${startDate?`startDate=${startDate.format()}&`:''}${endDate?`endDate=${endDate.format()}`:''}`)
                .then(response => this.props.setEntries(response.data))
                .catch(err => console.log(err));
        } else {
            axios.get(`/api/weightentries`)
                .then(response => this.props.setEntries(response.data))
                .catch(err => console.log(err));
        }
    };

    render() {
        return (
            <div className='container'>
                <div className='row justify-content-end'>
                    <Label>
                        <Icon name='filter'/>
                        Filters: 
                        <Filter programs={this.props.programs} applyFilters={this.handleApplyFilters}/>
                    </Label>
                </div>
                <div className='row'>
                    <WeightEntriesTable {...this.props} onDelete={this.handleOnDelete}/>
                </div>
                <div className='row'>
                    <button
                        onClick={this.onClick}
                        type="button"
                        className="btn btn-primary"
                    >
                        <Icon name='plus square'/>Add Entry
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    entries: state.entries,
    programs: state.programs
});

const mapDispatchToProps = (dispatch) => bindActionCreators({setEntries, startDeleteEntry, setPrograms}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(WeighData);