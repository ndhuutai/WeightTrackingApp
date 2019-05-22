import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import WeightEntriesTable from "./WeightEntriesTable";
import {Icon} from "semantic-ui-react";


class WeighData extends React.Component{
    
    onClick = () => {
        this.props.history.push('/weight-entry-form');
        console.log(this.props.history);
    };
    
    render() {
        return (
            <div>
                <WeightEntriesTable/>
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

export default connect()(WeighData);