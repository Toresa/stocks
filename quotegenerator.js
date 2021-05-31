
(function (QuoteGenerator) {

var config = require("./config");

QuoteGenerator.init = function(app){

  //https://zellwk.com/blog/async-await-in-loops/
  const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const getPrice = price => {
    var sleeptime = config.sleeptime * Math.random();
    var tickerObj = {};
    return sleep(sleeptime).then(v => {
      tickerObj.price = Math.round((price * (1 + Math.random() / 100)) * 100) / 100;
      tickerObj.time = new Date();
      return tickerObj
    }).catch(e => console.log("error", e))
  }


  const forLoop = async (connections) => {
    var stocks = config.stocks;
    while (true) {
      var indexStock = Math.round((config.stocks.length - 0.5) * Math.random());
      var stock = stocks[indexStock];
      console.log(stock);
      const tickerObj = await getPrice(stock.price)
      stock.prices.push(tickerObj.price);
      stock.dates.push(tickerObj.time);
      if (stock.prices.length > config.tickHistoryLength) {
        stock.prices.shift();
        stock.dates.shift();
      }
        app.io.emit('tick', {ticker: stock.ticker, price: tickerObj.price, prices: stock.prices, dates: stock.dates});
    }
  }
  forLoop();
}; //end init



})(module.exports);
