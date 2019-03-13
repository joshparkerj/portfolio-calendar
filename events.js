const data = require('./data.json');
const fs = require('fs');

function writeFile(){
  return new Promise( (res,rej) => {
    fs.writeFile('./data.json',JSON.stringify(data),err => {
      if (err) rej(err);
      else res('ok');
    })
  })
}

function createEvent(Event){
  Event.id = 1 + Math.max(...data.map(e => e.id));
  data.push(Event);
  return writeFile()
  .then(r => {
    return {id: Event.id};
  })
}

function readEvent(){
  return data;
}

function eventById(id){
  return data.filter(e => Number(e.id) === Number(id));
}

function updateEvent(Event,id){
  const E = data.find(e => Number(e.id) === Number(id));
  if (E){
    for (let i in Event){
      E[i] = Event[i];
    }
    return writeFile()
    .then(r => {
      return E;
    })
  }
  return null;
}

function deleteEvent(id){
  const i = data.findIndex(e => Number(e.id) === Number(id));
  if (i !== -1){
    data.splice(i,1);
    return writeFile()
    .then(r => {
      return true;
    })
  }
  return false;
}

const events = {
  createEvent: createEvent,
  readEvent: readEvent,
  updateEvent: updateEvent,
  deleteEvent: deleteEvent,
  eventById: eventById
};

module.exports = events;
