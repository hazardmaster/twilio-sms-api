const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
require('dotenv').config();
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.post('/api/messages', async (req, res) => {
  res.header('Content-Type', 'application/json');

  try {
    console.log('speaking to twilio...', req.body);
    const result = await client.messages.create({
      body: req.body.body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: req.body.to,
    });
    console.log('result from twilio...', result);

    res.send(JSON.stringify({ success: true }));
  } catch (err) {
    console.log(err);
    res.send(JSON.stringify({ success: false }));
  }
});

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
