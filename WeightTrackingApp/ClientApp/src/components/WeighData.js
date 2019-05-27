import React from 'react';
import {connect} from "react-redux";
import {Icon} from "semantic-ui-react";
import axios from 'axios';
import WeightEntriesTable from "./WeightEntriesTable";



class WeighData extends React.Component{
    
    componentDidMount() {
        axios.get('/api/weightentries')
            .then(response => console.log(response));
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


export default connect(mapStateToProps)(WeighData);