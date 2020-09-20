require('tiny-env')();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const passport = require('passport');
const path = require('path');

console.log(`${require('../package.json').name} v${require('../package.json').version}`);
console.log(`Running on Node ${process.version}`);

const { PORT } = require('./config');
const { connect } = require('./db');
const { sessionStoreMiddleware } = require('./session');
// eslint-disable-next-line no-unused-vars
const DiscordStrategy = require('./strategies/discord-strategy');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(morgan('tiny'));
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.use(compression());
app.use(sessionStoreMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

const routes = require('./routes');

app.use('/api/auth', routes.auth);
app.use('/', routes.user);
app.use('/', routes.lecture);
app.use('/', routes.module);
app.use('/', routes.course);

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

app.get('/', (req, res) => {
  res.render('index');
});

app.use((req, res) => {
  if (req.method === 'GET') {
    return res.redirect('/');
  }
  return res.status(404).end('Not Found');
});

connect().then(() => console.log('DB Connected'));

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

process.on('SIGINT', () => server.close());
process.on('SIGTERM', () => server.close());
