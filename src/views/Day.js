import React from 'react';
import './day.css';
import DisplayEvent from './DisplayEvent';

function Day(props){
  const currentEvents = props.events.filter(e => {
    return e.date === props.date.toDateString();
  })
  const el = currentEvents.length;
  return (
    <div className={`day ${el > 0 ? 'eventful' : ''}`}>
      <h4>
        {props.date.getDate()}
      </h4>
      <div className="display-events">
        {
            currentEvents.map((e,i) => {
              return (
                <DisplayEvent
                  event={e}
                  key={i}
                  handleDelete={null}
                />
              )
            })
        }
      </div>
    </div>
  )
}

export default Day;
