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
  short: ['Su','Mo','Tu','We','Th','Fr','Sa']
};

function WeekHeading(props){
  return (
    <div className="week-heading">
      {
        names[props.whStyle].map((e,i) => {
          return (
            <div key={i}><h4>{e}</h4></div>
          );
        })
      }
    </div>
  )
}

export default WeekHeading;
