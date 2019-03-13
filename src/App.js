import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Year from './views/Year.js';
import Month from './views/Month.js';
import Week from './views/Week.js';
import Day from './views/Day.js';
import AddEvent from './views/AddEvent.js';
import ModifyEvents from './views/ModifyEvents.js';
import UpdateEvent from './views/UpdateEvent.js';
import { readEvent } from './data/api.js'

const handleChange = event => {
  const theDay = new Date(event.target.value);
  const today = new Date();
  this.setState({date: theDay || today});
}

const handleClick = () => {
  const d = new Date(this.state.date);
  d.setDate(d.getDate()+1);
  console.log(d);
  this.setState({day: d});
}

const refreshEvents = () => {
  readEvent()
  .then(res => {
    this.setState({events: res});
  })
  .catch(err => {
    console.error(err);
  })
}


class App extends Component {
  constructor(){
    super();
    const day = new Date();
    this.state = {
      day: day,
      date: new Date(day),
      today: new Date(day),
      events: []
    }
    this.handleChange = handleChange;
    this.handleClick = handleClick;
    this.refreshEvents = refreshEvents;
  }

  componentDidMount(){
    readEvent()
      .then(res => {
        this.setState({events: res});
      })
      .catch(err => {
        console.error(err);
      })
  }

  render() {
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
            <label>date to display:</label>
            <input
              name="date"
              type="date"
              onChange={this.handleChange}
              value={
                this.state.date.toJSON() ?
                this.state.date.toJSON().slice(0,10) :
                this.state.today.toJSON().slice(0,10)
              }
            />
            <br /><button onClick={this.handleClick}>View date</button>
            <br /><button onClick={this.refreshEvents}>Refresh events</button>
          </div>
        </div>
          <Switch>
            <Route
              path='/year'
              render={(props) => <Year {...props}
                date={this.state.day}
                events={this.state.events}
              />}
            />
            <Route
              path='/month'
              render={(props) => <Month {...props}
                date={this.state.day}
                events={this.state.events}
              />}
            />
            <Route
              path='/week'
              render={(props) => <Week {...props}
                date={this.state.day}
                events={this.state.events}
              />}
            />
            <Route
              path='/day'
              render={(props) => <Day {...props}
                date={this.state.day}
                events={this.state.events}
              />}
            />
            <Route path='/addevent' component={AddEvent}/>
            <Route path='/modifyevents' component={ModifyEvents}/>
            <Route path='/updateevent/:id' component={UpdateEvent}/>
          </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
