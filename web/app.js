/* Generacer web client */

const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon'); // TODO: reenable when we make a favicon WHAT IS THIS?
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');

// TODO: put routes here like below
// const home = require('./routes/home');

// const env = process.env.NODE_ENV || 'development'; // TODO: WHAT IS THIS?
// const conf = require('./config/webConfig')[env]; // TODO: WHAT IS THIS?

const app = express();
// const mongo...

app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// TODO: Use pages for app like below
// app.use('/', home);
// app.use('/admin', admin);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

http.createServer(app).listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});
