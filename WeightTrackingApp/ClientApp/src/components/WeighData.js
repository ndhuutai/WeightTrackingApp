import React from 'react';
import {connect} from "react-redux";
import {Icon} from "semantic-ui-react";
import axios from 'axios';
import WeightEntriesTable from "./WeightEntriesTable";
import {bindActionCreators} from "redux";
import {setEntries, startDeleteEntry} from "../actions/WeightEntry";



class WeighData extends React.Component{
    
    componentDidMount() {
        axios.get('/api/weightentries')
            .then(response => this.props.setEntries(response.data))
            .catch(err => console.log(err));
    }

    onClick = () => {
        this.props.history.push('/weight-entry-form');
    };
    
    //getting the id from the table
    handleOnDelete = (id) => {
        this.props.startDeleteEntry(id);
    };
    
    render() {
        return (
            <div>
                <WeightEntriesTable {...this.props} onDelete={this.handleOnDelete}/>
                <button 
                    onClick={this.onClick}
                    type="button"
                    className="btn btn-primary"
                >
                    <Icon name='plus square'/>Add Entry</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    entries: state.entries
});

const mapDispatchToProps = (dispatch) => bindActionCreators({setEntries, startDeleteEntry}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(WeighData);