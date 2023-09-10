
const express = require('express');
const urlencoded = require('body-parser').urlencoded;
const app = express();
const port = 3000;

app.use(urlencoded({ extended: false }));

const VoiceResponse = require('twilio').twiml.VoiceResponse;

app.all('/', (request, response) => {
  response.type('xml');
  const twiml = new VoiceResponse();
  twiml.say('Hello, this is Sara from XYZ company.');
  const gather = twiml.gather({
    input: 'dtmf',
    action: '/results',
  });
  gather.say('Press 1 for "Company Details", Press 2 for "Instructions I can perform"');
  response.send(twiml.toString());
});

app.all('/results', (request, response) => {
    const userInput = request.body.Digits;
    const twiml = new VoiceResponse();
  
    switch (userInput) {
      case '1':
        twiml.say("XYZ is a forward-thinking technology company specializing in innovative solutions for a digital world.");
        break;
      case '2':
        twiml.say("You can ask me questions or give me instructions.");
        break;
      default:
        twiml.say("I didn't understand that.");
    }
  
    response.type('xml');
    response.send(twiml.toString());
  });
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });