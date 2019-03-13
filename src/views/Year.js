import React from 'react';
import './year.css';
import Month from './Month.js';

function Year(props){
  const year = props.date.getFullYear();
  const days = [];
  const day = new Date(year,0);
  while (day.getFullYear() === year){
    days.push(new Date(day));
    day.setMonth(day.getMonth()+1);
  }
  return (
    <div className="year">
      <div><h4>{year}</h4></div>
      <div className="calendar">
        {
          days.map((e,i) => {
            return (
              <Month date={e} whStyle="short" key={i} events={props.events}/>
            );
          })
        }
      </div>
    </div>
  );
}

export default Year;
