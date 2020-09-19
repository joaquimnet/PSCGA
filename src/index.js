const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');

console.log(`${require('../package.json').name} v${require('../package.json').version}`);
console.log(`Running on Node ${process.version}`);

const { PORT } = require('./config');

const app = express();

app.use(morgan('common'));
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

app.use(express.static(path.join(__dirname, 'public')));

app.post('/survey', express.urlencoded({ extended: true }), (req, res) => {
  console.log('//////////////////// SURVEY RESULTS ////////////////////');
  console.log(JSON.stringify(req.body, null, 2));
  console.log('///////////////////////////////////////////////////////');
  return res.send(`
    <html>
      <head><title>Thank you!</title></head>
      <body style="background-image: linear-gradient(0deg, #4e4255 0, #424455);display:flex;justify-content:center;align-items:center;height:100%;color:white">
        <h1 style="font-size:4rem;font-family:sans-serif">Thank you!</h1>
      </body>
    </html>
  `);
});

app.use((req, res) => {
  return res.status(404).end('Not Found');
});

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

process.on('SIGINT', () => server.close());
process.on('SIGTERM', () => server.close());
