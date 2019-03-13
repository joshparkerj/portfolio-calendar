import React from 'react';
import './week.css';
import Day from './Day.js';
import WeekHeading from './WeekHeading.js';

function Week(props){
  const day = new Date(props.date);
  const whStyle = props.whStyle || 'long';
  const heading = (props.heading && props.heading === 'none') ?
    '' : (<WeekHeading whStyle={whStyle}/>);
  const days = [];
  while (day.getDay() > 0){
    day.setDate(day.getDate()-1);
  }
  while (days.length < 7){
    days.push(new Date(day));
    day.setDate(day.getDate()+1);
  }
  return (
    <div className="week">
      {heading}
      {
        days.map((e,i) => {
          return (
            <Day date={e} key={i} events={props.events} />
          );
        })
      }
    </div>
  );
}

export default Week;
