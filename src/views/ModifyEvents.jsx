import React, { Component } from 'react';
import './modify-events.css';
import { ToastContainer, toast } from 'react-toastify';
import { readEvent, deleteEvent } from '../data/api';
import DisplayEvent from './DisplayEvent';
import 'react-toastify/dist/ReactToastify.min.css';

class ModifyEvents extends Component {
  constructor() {
    super();
    this.state = {
      currentEvents: [],
      date: 0,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLoad = () => {
    const { date } = this.state;
    const d = new Date(date);
    const correctedDate = d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
    const cd = new Date(correctedDate);
    readEvent()
      .then((res) => res.filter((e) => e.date === cd.toDateString()))
      .then((res) => {
        if (res.length < 1) {
          toast.warn('we have no events for that date');
        }
        this.setState({ currentEvents: res });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  renderEvents = () => {
    const { currentEvents } = this.state;
    try {
      return currentEvents.map((e) => (
        <DisplayEvent
          event={e}
          key={e}
          handleDelete={this.handleDelete}
        />
      ));
    } catch (e) {
      console.log('no events data available');
      console.error(e);
      toast.error('couldn\'t get events data');
      return '';
    }
  };

  handleDelete = (id) => {
    deleteEvent(id)
      .then((res) => {
        if (res === 200) {
          toast.success('deleted!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
          this.handleLoad();
        } else {
          toast.error('it didn\'t work');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    return (
      <div className="modify-events">
        <ToastContainer />
        <div className="load-event">
          <label htmlFor="date">
            Date:
            <input id="date" name="date" type="date" onChange={this.handleChange} />
          </label>
          <button type="button" onClick={this.handleLoad}>LOAD</button>
        </div>
        <div className="display-events">
          {
            this.renderEvents()
          }
        </div>
      </div>
    );
  }
}

export default ModifyEvents;
