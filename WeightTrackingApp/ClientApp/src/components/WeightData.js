import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {Icon, Label, Pagination} from "semantic-ui-react";
import axios from 'axios';
import WeightEntriesTable from "./WeightEntriesTable";
import {bindActionCreators} from "redux";
import {setEntries, startDeleteEntry} from "../actions/WeightEntry";
import {setPrograms} from '../actions/Program';
import { setEndDate, setStartDate, setProgramFilter, resetFilters, setLimit, setSkipAndTake } from '../actions/WeightEntryFilters';
import selectWeightEntries from '../selectors/WeightEntries';


import Filter from './Filter';

class WeighData extends React.Component {

    componentDidMount() {
        //populate entries
        axios.get('/api/weightentries')
            .then(response => this.props.setEntries(response.data))
            .catch(err => console.log(err));
        //populate programs
        axios.get('/api/programs')
            .then(response => this.props.setPrograms(response.data))
            .catch(err => console.log(err));
    }

    //onClick handle for child component
    onClick = () => {
        this.props.history.push('/weight-entry-form');
    };

    //getting the id from the table
    handleOnDelete = (id) => {
        this.props.startDeleteEntry(id);
    };

    handleApplyFilters = async ({program, startDate, endDate}) => {
        
        this.props.setProgramFilter(program);
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
        
        const params = {
            startDate : startDate ? startDate.format() : '',
            endDate: endDate ? endDate.format() : ''
        };
        
        let response;
        
        if (program) {
            response = axios.get(`/api/weightentries/program/${program}`, {
                params
            })
            
        } else if (!program && (startDate || endDate)) {
            response = axios.get(`/api/weightentries/bydate`, {
                params
            })
        } else {
            response = axios.get(`/api/weightentries`);
        }
        
        this.props.setEntries(response.data)
    };

    handlePageChange = (e, data) => {
        //getting active page
        this.props.setSkipAndTake((data.activePage - 1)  * this.props.filters.limit);
    };

    render() {
        return (
            <Fragment>
                <div className='row justify-content-end'>
                    <Label>
                        <Icon name='filter'/>
                        Filters:
                        <Filter programs={this.props.programs} applyFilters={this.handleApplyFilters}/>
                    </Label>
                </div>
                <div className='row'>
                    <WeightEntriesTable entries={this.props.entries} onDelete={this.handleOnDelete}/>
                </div>
                <div className='row'>
                    <Pagination defaultActivePage={1}
                                totalPages={this.props.totalPages}
                                onPageChange={this.handlePageChange}
                    />
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
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    entries: selectWeightEntries(state.entries, state.filters),
    programs: state.programs,
    filters: state.filters,
    totalPages : Math.ceil(state.entries.length / state.filters.limit)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setEntries, 
    startDeleteEntry, 
    setPrograms,
    setProgramFilter,
    setStartDate,
    setEndDate,
    resetFilters,
    setSkipAndTake,
    setLimit
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(WeighData);