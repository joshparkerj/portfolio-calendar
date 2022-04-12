import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useMatch } from 'react-router-dom';
import { updateEvent, eventById } from '../data/api';
import 'react-toastify/dist/ReactToastify.min.css';
import './update-event.css';

const UpdateEvent = function UpdateEvent() {
  const match = useMatch();

  const [name, setName] = useState('');
  const [date, setDate] = useState(0);
  const [time, setTime] = useState(0);
  const [idNumber, setIdNumber] = useState(0);
  const [namewas, setNamewas] = useState('');
  const [datewas, setDatewas] = useState(0);
  const [timewas, setTimewas] = useState(0);

  const handleUpdate = () => {
    const dateToFormat = new Date(date);
    dateToFormat.setDate(dateToFormat.getDate() + 1);
    const formattedDate = dateToFormat.toDateString();
    updateEvent({
      name,
      date: formattedDate,
      time,
    }, idNumber)
      .then(() => {
        toast.success('updated!');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const { id } = match.params;
    eventById(id)
      .then((res) => {
        setIdNumber(id);
        setNamewas(res[0].name);
        setDatewas(res[0].date);
        setTimewas(res[0].time);
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
  }, []);

  return (
    <div className="update-event">
      <ToastContainer />
      <h4>Edit this event:</h4>
      <p>
        {' '}
        Name was
        {namewas}
      </p>
      <label htmlFor="name">
        Name:

        <input
          name="name"
          id="name"
          onChange={({ target: { value } }) => setName(value)}
          value={name}
        />
      </label>
      <br />
      <p>
        {' '}
        Date was
        {datewas}
      </p>
      <label htmlFor="date">
        Date:
        <input
          name="date"
          type="date"
          id="date"
          onChange={({ target: { value } }) => setDate(value)}
          value={date}
        />
      </label>
      <br />
      <p>
        {' '}
        Time was
        {timewas}
      </p>
      <label htmlFor="time">
        Time:
        <input
          name="time"
          type="time"
          id="time"
          onChange={({ target: { value } }) => setTime(value)}
          value={time}
        />
      </label>
      <br />
      <button type="submit" onClick={handleUpdate}>UPDATE</button>
    </div>
  );
};

export default UpdateEvent;
