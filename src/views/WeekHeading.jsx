import { string } from 'prop-types';
import React from 'react';
import './week-heading.css';

const names = {
  long: ['Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'],
  short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
};

const WeekHeading = function WeekHeading({ whStyle }) {
  return (
    <div className="week-heading">
      {
        names[whStyle].map((e) => (
          <div key={e}><h4>{e}</h4></div>
        ))
      }
    </div>
  );
};

WeekHeading.propTypes = {
  whStyle: string.isRequired,
};

export default WeekHeading;
