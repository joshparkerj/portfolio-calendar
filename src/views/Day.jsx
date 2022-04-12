import React from 'react';
import {
  arrayOf, shape, instanceOf, number,
} from 'prop-types';

import './day.css';
import DisplayEvent from './DisplayEvent';

const Day = function Day({ events, date }) {
  const currentEvents = events.length ? events.filter((e) => e.date === date.toDateString()) : [];
  const el = currentEvents.length;
  return (
    <div className={`day ${el > 0 ? 'eventful' : ''}`}>
      <h4>
        {date.getDate()}
      </h4>
      <div className="display-events">
        {
            currentEvents.map((e) => (
              <DisplayEvent
                event={e}
                key={e.id}
                handleDelete={null}
              />
            ))
        }
      </div>
    </div>
  );
};

Day.propTypes = {
  events: arrayOf(shape({
    date: instanceOf(Date),
    id: number,
  })).isRequired,
  date: instanceOf(Date).isRequired,
};

export default Day;
