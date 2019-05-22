import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";


class WeighData extends React.Component{
    
    onClick = () => {
        this.props.history.push('/weight-entry-form');
        console.log(this.props.history);
    };
    
    render() {
        return (
            <div>
                <button 
                    onClick={this.onClick}
                    type="button"
                    className="btn btn-primary"
                >Add Entry</button>
            </div>
        )
    }
}

export default connect()(WeighData);