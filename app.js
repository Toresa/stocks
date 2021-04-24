var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var qoutesRouter = require('./routes/quotes');



var app = express();
app.io = require('socket.io')();
var QuoteGenerator = require('./quotegenerator');
QuoteGenerator.init(app);

var connected = true;
var connections = 0;

app.io.on('connection', (socket) => {
  console.log("connection made");
  connections++;
  if(connections == 1){
    //startQuotes();
  }
  connected = true;
  console.log('connections', connections);
  socket.on('tick', (msg) => {
    app.io.emit('tick', msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
    connections--;
    console.log('connections', connections);
    connected = false;
  });
});
/*
//https://zellwk.com/blog/async-await-in-loops/
const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const getPrice = price => {
  //var initialPrice = price;
  var sleeptime = 5000 * Math.random();
  return sleep(sleeptime).then(v => (Math.round((price * (1 + Math.random()/100))*100))/100).catch( e => console.log("errror", e))
}

//getPrice()
//  .then(num => console.log(num))

const startQuotes = async _ => {
  var stocks = [{"ticker":"aapl", "price":127},
                {"ticker":"msft", "price":250},
                {"ticker":"orcl","price":74}];
  while (connections > 0) {
    var indexStock = Math.round(2.5*Math.random());
    var stock = stocks[indexStock];
    console.log(stock.ticker);
    const price = await getPrice(stock.price)
      app.io.emit('tick', {ticker:stock.ticker, price: price});
  }
}

*/


//quotegenerator.startQuotes(connections);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', qoutesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
