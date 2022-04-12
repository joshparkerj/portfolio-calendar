import React from 'react';
import {
  string, instanceOf, arrayOf, shape,
} from 'prop-types';

import './month.css';
import Week from './Week';

const names = ['January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'];

const Month = function Month({ whStyle, date, events }) {
  const day = new Date(date);
  day.setDate(1);
  const month = day.getMonth();
  const days = [];
  while (days.length < 6) {
    days.push(new Date(day));
    day.setDate(day.getDate() + 7);
  }

  return (
    <div className="month">
      <div className="month-name"><h4>{names[month]}</h4></div>
      {
        days.map((e, i) => {
          if (i === 0) {
            return (
              <Week date={e} whStyle={whStyle} key={e} events={events} />
            );
          }
          return (
            <Week date={e} key={e} heading="none" events={events} />
          );
        })
      }
    </div>
  );
};

Month.propTypes = {
  whStyle: string,
  date: instanceOf(Date).isRequired,
  events: arrayOf(shape({
  })).isRequired,
};

Month.defaultProps = {
  whStyle: 'long',
};

export default Month;
