import React from 'react';
import './month.css';
import Week from './Week.js';

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

function Month(props){
  const whStyle = props.whStyle || 'long';
  const day = new Date(props.date);
  day.setDate(1);
  const month = day.getMonth();
  const days = [];
  while (days.length < 6) {
    days.push(new Date(day));
    day.setDate(day.getDate()+7);
  }
  return (
    <div className="month">
      <div className="month-name"><h4>{names[month]}</h4></div>
      {
        days.map((e,i) => {
          if (i===0){
            return (
              <Week date={e} whStyle={whStyle} key={i} events={props.events}/>
            )
          }
          return (
            <Week date={e} key={i} heading="none" events={props.events}/>
          );
        })
      }
    </div>
  )
}

export default Month;
