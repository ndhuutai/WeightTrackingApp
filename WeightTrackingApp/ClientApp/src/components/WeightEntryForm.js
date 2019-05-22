import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from "react-dates";


export default class WeightEntryForm extends React.Component{
    
    state = {
        date : moment()
    };
    
    onSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.weight.value);
        console.log(e.target.notes.value);
    };
    
    render() {
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="form-group col">
                            <label htmlFor="weight">Weight</label>
                            <input type="text" className="form-control" id="weight" name="weight" placeholder="Weight"/>
                        </div>
                        <div className="form-group col">
                            <label >Notes</label>
                            <textarea  className="form-control" name="notes" placeholder="Add your notes"/>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label>Date:</label>
                    </div>
                    <div className="form-group">
                        <SingleDatePicker
                        
                        />
                    </div>
                    <button className="btn btn-primary" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}