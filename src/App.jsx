import React, { Component } from 'react';
import {
  BrowserRouter as Router, Routes, Route, Link,
} from 'react-router-dom';
import './App.css';
import Year from './views/Year';
import Month from './views/Month';
import Week from './views/Week';
import Day from './views/Day';
import AddEvent from './views/AddEvent';
import ModifyEvents from './views/ModifyEvents';
import UpdateEvent from './views/UpdateEvent';
import { readEvent } from './data/api';

const handleChange = (event) => {
  const theDay = new Date(event.target.value);
  const today = new Date();
  this.setState({ date: theDay || today });
};

const handleClick = () => {
  const d = new Date(this.state.date);
  d.setDate(d.getDate() + 1);
  console.log(d);
  this.setState({ day: d });
};

const refreshEvents = () => {
  readEvent()
    .then((res) => {
      this.setState({ events: res });
    })
    .catch((err) => {
      console.error(err);
    });
};

class App extends Component {
  constructor() {
    super();
    const day = new Date();
    this.state = {
      day,
      date: new Date(day),
      today: new Date(day),
      events: [],
    };
    this.handleChange = handleChange;
    this.handleClick = handleClick;
    this.refreshEvents = refreshEvents;
  }

  componentDidMount() {
    readEvent()
      .then((res) => {
        this.setState({ events: res });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const {
      day, date, events, today,
    } = this.state;

    return (
      <Router>
        <div className="app">
          <div className="app-heading">
            <ul>
              <li><Link to="/year">Year</Link></li>
              <li><Link to="/month">Month</Link></li>
              <li><Link to="/week">Week</Link></li>
              <li><Link to="/day">Day</Link></li>
            </ul>
            <ul>
              <li><Link to="/addevent">Add Event</Link></li>
              <li><Link to="/modifyevents">Modify Events</Link></li>
            </ul>
            <div className="heading-date-picker">
              <label htmlFor="date">
                date to display:
                <input
                  name="date"
                  type="date"
                  onChange={this.handleChange}
                  value={
                    date.toJSON()
                      ? date.toJSON().slice(0, 10)
                      : today.toJSON().slice(0, 10)
                  }
                />
              </label>
              <br />
              <button type="button" onClick={this.handleClick}>View date</button>
              <br />
              <button type="button" onClick={this.refreshEvents}>Refresh events</button>
            </div>
          </div>
          <Routes>
            <Route
              path="/year"
              element={(
                <Year
                  date={day}
                  events={events}
                />
              )}
            />
            <Route
              path="/month"
              element={(
                <Month
                  date={day}
                  events={events}
                />
              )}
            />
            <Route
              path="/week"
              element={
                (
                  <Week
                    date={day}
                    events={events}
                  />
                )
              }
            />
            <Route
              path="/day"
              element={(
                <Day
                  date={day}
                  events={events}
                />
              )}
            />
            <Route path="/addevent" component={AddEvent} />
            <Route path="/modifyevents" component={ModifyEvents} />
            <Route path="/updateevent/:id" component={UpdateEvent} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
