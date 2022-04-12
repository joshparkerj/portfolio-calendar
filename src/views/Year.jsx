import React from 'react';
import { instanceOf, shape, arrayOf } from 'prop-types';

import './year.css';
import Month from './Month';

const Year = function Year({ events, date }) {
  const year = date.getFullYear();
  const days = [];
  const day = new Date(year, 0);
  while (day.getFullYear() === year) {
    days.push(new Date(day));
    day.setMonth(day.getMonth() + 1);
  }
  return (
    <div className="year">
      <div><h4>{year}</h4></div>
      <div className="calendar">
        {
          days.map((e) => (
            <Month date={e} whStyle="short" key={e} events={events} />
          ))
        }
      </div>
    </div>
  );
};

Year.propTypes = {
  events: arrayOf(shape({
  })).isRequired,
  date: instanceOf(Date).isRequired,
};

export default Year;
