import React from 'react';
import { Link } from 'react-router-dom';
import {
  shape, number, string, func,
} from 'prop-types';

import './display-event.css';

function handleClick(id, hd) {
  hd(id);
}

const DisplayEvent = function DisplayEvent({ event, handleDelete }) {
  return (
    <div className="display-event">
      <h4>{event.name}</h4>
      <p>{event.date}</p>
      <p>{event.time}</p>
      <div className="event-modifiers">
        <button type="button" onClick={() => handleClick(event.id, handleDelete)}>
          delete this event
        </button>
        <Link to={`/updateevent/${event.id}`}>
          <button type="button">update this event</button>
        </Link>
      </div>
    </div>
  );
};

DisplayEvent.propTypes = {
  event: shape({
    id: number,
    name: string,
    date: string,
    time: string,
  }).isRequired,
  handleDelete: func.isRequired,
};

export default DisplayEvent;
