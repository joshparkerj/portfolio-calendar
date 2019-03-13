import React, { Component } from 'react';
import './modify-events.css';
import { readEvent,deleteEvent } from '../data/api.js';
import DisplayEvent from './DisplayEvent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const handleChange = event => {
  this.setState({[event.target.name]: event.target.value});
}

const handleLoad = () => {
  const d = new Date(this.state.date);
  const correctedDate = d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
  const cd = new Date(correctedDate);
  readEvent()
    .then(res => {
      return res.filter(e => e.date === cd.toDateString());
    })
    .then(res => {
      if (res.length < 1){
        toast.warn('we have no events for that date');
      }
      this.setState({currentEvents: res});
    })
    .catch(err => {
      console.error(err);
    })
}

const renderEvents = () => {
  try {
    return this.state.currentEvents.map((e,i) => {
      return (
        <DisplayEvent
          event={e}
          key={i}
          handleDelete={this.handleDelete}
        />
      )
    })}
  catch(e) {
    console.log('no events data available');
    console.error(e);
    toast.error('couldn\'t get events data');
    return '';
  }
}

class ModifyEvents extends Component {
  constructor(){
    super();
    this.state = {
      currentEvents: [],
      date: 0,
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.renderEvents = renderEvents;
    this.handleLoad = handleLoad;
    this.handleChange = handleChange;
  }

  handleDelete(id){
    deleteEvent(id)
      .then(res => {
        if(res === 200){
          toast.success('deleted!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500
          })
          this.handleLoad();
        }else{
          toast.error('it didn\'t work');
        }
      })
      .catch(err => {
        console.error(err);
      })
  }

  render(){
    return (
      <div className="modify-events">
        <ToastContainer />
        <div className="load-event">
          <label>Date:</label>
          <input name="date" type="date" onChange={this.handleChange}/>
          <button onClick={this.handleLoad}>LOAD</button>
        </div>
        <div className="display-events">
          {
            this.renderEvents()
          }
        </div>
      </div>
    )
  }
}

export default ModifyEvents;
