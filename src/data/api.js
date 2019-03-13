import axios from 'axios';

const API = '/';

const err = err => {
  console.error(err);
  return err;
}

export function createEvent(Event){
  return axios.post(`${API}events`, {
    name: Event.name,
    date: new Date(`${Event.date} ${Event.time || ''}`)
  })
    .then(res => {
      return res.data.id;
    })
    .catch(err)
}

export function readEvent(){
  return axios.get(`${API}all-events`)
    .then(res => {
      return res.data;
    })
    .catch(err)
}

export function eventById(id){
  return axios.get(`${API}events/?id=${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err)
}

export function updateEvent(E, id){
  return axios.put(`${API}events/${id}`, {
    name: E.name,
    date: E.date,
    time: `${E.time}:00`
  })
    .then(res => {
      return res.data;
    })
    .catch(err)
}

export function deleteEvent(id){
  return axios.delete(`${API}events/${id}`)
    .then(res => {
      return res.status;
    })
    .catch(err)
}
