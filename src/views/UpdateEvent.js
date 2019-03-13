import React, { Component } from 'react';
import './update-event.css';
import { updateEvent, eventById } from '../data/api.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const handleChange = event => {
  this.setState({[event.target.name]: event.target.value});
}

const handleUpdate = () => {
  const date = new Date(this.state.date);
  date.setDate(date.getDate()+1);
  const formattedDate = date.toDateString();
  updateEvent({
    name: this.state.name,
    date: formattedDate,
    time: this.state.time
  },this.state.id)
    .then(res => {
      toast.success('updated!');
    })
    .catch(err => {
      console.error(err);
    })
}

class UpdateEvent extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      date: 0,
      time: 0,
      id: 0,
      namewas: '',
      datewas: 0,
      timewas: 0
    }
    this.handleChange = handleChange;
    this.handleUpdate = handleUpdate;
  }

  componentDidMount(){
    const id = this.props.match.params.id;
    eventById(id)
      .then(res => {
        this.setState({
          id: id,
          namewas: res[0].name,
          datewas: res[0].date,
          timewas: res[0].time
        })
      })
      .catch(err => {
        console.error(err);
        return err;
      })
  }

  render(){
    return (
      <div className="update-event">
        <ToastContainer />
        <h4>Edit this event:</h4>
        <p> Name was {this.state.namewas}</p>
        <label>Name:</label>
        <input
          name="name"
          onChange={this.handleChange}
          value={this.state.name}
        /><br/>
        <p> Date was {this.state.datewas}</p>
        <label>Date:</label>
        <input
          name="date"
          type="date"
          onChange={this.handleChange}
          value={this.state.date}
        /><br/>
        <p> Time was {this.state.timewas}</p>
        <label>Time:</label>
        <input
          name="time"
          type="time"
          onChange={this.handleChange}
          value={this.state.time}
        /><br/>
        <button onClick={this.handleUpdate}>UPDATE</button>
      </div>
    )
  }
}

export default UpdateEvent;
