import React from 'react';
import { Link } from 'react-router-dom';
import './display-event.css';

function handleClick(id, hd){
  hd(id);
}

function DisplayEvent(props) {
  return (
    <div className="display-event">
      <h4>{props.event.name}</h4>
      <p>{props.event.date}</p>
      <p>{props.event.time}</p>
      <div className="event-modifiers">
        <button onClick={e => handleClick(props.event.id,props.handleDelete)}>
          delete this event
        </button>
        <Link to={`/updateevent/${props.event.id}`}>
          <button>update this event</button>
        </Link>
      </div>
    </div>
  )
}

export default DisplayEvent;
