import React from 'react';
import {
  string, instanceOf, arrayOf, shape,
} from 'prop-types';
import Day from './Day';
import WeekHeading from './WeekHeading';
import './week.css';

const Week = function Week({
  date, whStyle, heading, events,
}) {
  const day = new Date(date);
  const weekHeading = (heading && heading === 'none')
    ? '' : (<WeekHeading whStyle={whStyle} />);
  const days = [];
  while (day.getDay() > 0) {
    day.setDate(day.getDate() - 1);
  }
  while (days.length < 7) {
    days.push(new Date(day));
    day.setDate(day.getDate() + 1);
  }
  return (
    <div className="week">
      {weekHeading}
      {
        days.map((e) => (
          <Day date={e} key={e} events={events} />
        ))
      }
    </div>
  );
};

Week.propTypes = {
  date: instanceOf(Date).isRequired,
  whStyle: string,
  heading: string.isRequired,
  events: arrayOf(shape({
  })).isRequired,
};

Week.defaultProps = {
  whStyle: 'long',
};

export default Week;
