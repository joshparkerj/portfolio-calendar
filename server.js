const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const events = require('./events');

app.use(bodyParser.json());
app.use(cors({origin: ['http://localhost:3000']}));

app.use(express.static('./build'));
app.get('/',(req,res) => {
  res.sendFile('./build/index.html');
})

app.get('/all-events/', (req,res) => {
  res.send(events.readEvent());
})

app.get('/events', (req,res) => {
  res.send(events.eventById(req.query.id));
})

app.delete('/events/:id', (req,res) => {
  events.deleteEvent(Number(req.params.id))
  .then(r => {
    res.status(r ? 200 : 404).send();
  })
})

app.post('/events', (req,res) => {
  const date = new Date(req.body.date);
  events.createEvent({
    name: req.body.name,
    time: date.toLocaleTimeString(),
    date: date.toDateString()
  })
  .then(r => {
    res.send(r);
  })
});


app.put('/events/:id', (req,res) => {
  events.updateEvent(req.body,Number(req.params.id))
  .then(r => {
    if (r){
      res.status(200).send(r);
    }else{
      res.status(404).send();
    }
  })
})

app.get('*', (req,res) => {
  res.sendFile(__dirname + '/build/index.html');
})

app.listen(process.env.PORT || 8080);
