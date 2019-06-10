import React from 'react';
import {Dropdown} from "semantic-ui-react";


export default class Filter extends React.Component {
    render() {
        return (
            <Dropdown
                placeholder="Select program"
                selection
                search
                noResultsMessage='No result found'
                options={[]}
            />
        );
    }
}