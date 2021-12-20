import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default class ThisCalendar extends Component {
  state = {
    thisDate: new Date(),
  }

  onChange = thisDate => this.setState({ thisDate })
  

  render() {
    return (

      <div>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
          month={value.month}
        />
      </div>
    );
  }
}