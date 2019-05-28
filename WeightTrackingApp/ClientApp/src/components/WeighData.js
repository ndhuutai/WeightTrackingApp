import React from 'react';
import {connect} from "react-redux";
import {Icon} from "semantic-ui-react";
import axios from 'axios';
import WeightEntriesTable from "./WeightEntriesTable";
import {bindActionCreators} from "redux";
import {setEntries} from "../actions/WeightEntry";



class WeighData extends React.Component{
    
    componentDidMount() {
        axios.get('/api/weightentries')
            .then(response => this.props.setEntries(response.data))
            .catch(err => console.log(err));
    }

    onClick = () => {
        this.props.history.push('/weight-entry-form');
        console.log(this.props.history);
    };
    
    render() {
        return (
            <div>
                <WeightEntriesTable {...this.props}/>
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

const mapDispatchToProps = (dispatch) => bindActionCreators({setEntries}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(WeighData);