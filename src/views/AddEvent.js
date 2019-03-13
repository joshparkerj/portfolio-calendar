import React, { Component } from 'react';
import './add-event.css';
import { createEvent } from '../data/api.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const handleChange = event => {
  this.setState({[event.target.name]: event.target.value});
}

const handleClick = () => {
  createEvent(this.state)
    .then(res => {
      if (typeof res === 'number'){
        toast.success("Thank you!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }else{
        toast.error("It didn't work...", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    })
    .catch(err => {
      console.error(err);
    })
}

class AddEvent extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      date: 0,
      time: null
    }
    this.handleClick = handleClick;
    this.handleChange = handleChange;
  }

  render(){
    return (
      <div className="add-event">
        <ToastContainer />
        <label>Name:</label>
        <input name="name" onChange={this.handleChange}/><br/>
        <label>Date:</label>
        <input name="date" type="date" onChange={this.handleChange}/><br/>
        <label>Time:</label>
        <input name="time" type="time" onChange={this.handleChange}/><br/>
        <button onClick={this.handleClick}>submit</button>
      </div>
    )
  }
}

export default AddEvent;