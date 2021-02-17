global.appurl = "http://localhost:3000";
global.PROJECT_DIR = __dirname;

require("rootpath")();
var createError = require("http-errors");
var express = require("express");
var session = require('express-session');
var path = require("path");
var cookieParser = require("cookie-parser");
var pg = require("pg");
var bodyParser = require('body-parser');
var logger = require("morgan");

require("dotenv").config();
var cors=require('cors')


global.client = {};
try {
  global.client = new pg.Client(`${process.env.DATABASE_URL}?ssl=false`);
  client.connect();
} catch (e) {
  console.log(`ERROR::: app.js >>> 14 >>> err `, e);
}

var app = express();

app.use(bodyParser.json({ limit: '6mb' }))
app.use(cors())


app.use(bodyParser.json())

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'GHFHSGAVNBA6735e673HJGDSHDJHasdasd',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


var http = require('http');
var port = process.env.PORT || '3000';
app.set('port', port);

var server = http.createServer(app);
require('./router')(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});



server.listen(port);

module.exports = app;
