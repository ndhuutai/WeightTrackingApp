import React from 'react';
import {Dropdown} from "semantic-ui-react";


export default class Filter extends React.Component {
    
    handleOnChange = (e, data) => {
        //getting the id from the selected program and pass it up
        this.props.handleProgramFilter(data.value);
    };
    
    render() {
        return (
            <Dropdown
                placeholder="Select program"
                selection
                search
                noResultsMessage='No result found'
                clearable
                options={this.props.programs.map(program => {
                    return {
                        key: program.id,
                        text: program.name,
                        value: program.id
                    }
                })} 
                onChange={this.handleOnChange}
            />
        );
    }
}