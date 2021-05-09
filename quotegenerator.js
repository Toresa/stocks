
(function (QuoteGenerator) {


QuoteGenerator.init = function(app){

  //https://zellwk.com/blog/async-await-in-loops/
  const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const getPrice = price => {
    var sleeptime = 5000 * Math.random();
    var tickerObj = {};
    return sleep(sleeptime).then(v => {
      tickerObj.price = Math.round((price * (1 + Math.random() / 100)) * 100) / 100;
      tickerObj.time = new Date();
      return tickerObj
    }).catch(e => console.log("errror", e))
  }


  const forLoop = async (connections) => {
    var stocks = [{"ticker":"aapl", "price":127, "prices":[127]},
                  {"ticker":"msft", "price":250, "prices":[250]},
                  {"ticker":"orcl","price":74, "prices":[74]}];
    while (true) {
      var indexStock = Math.round(2.5*Math.random());
      var stock = stocks[indexStock];
      console.log(stock);
      const tickerObj = await getPrice(stock.price)
      stock.prices.push(tickerObj.price);
      if( stock.prices.length > 10) {
        stock.prices = stock.prices.reverse();
        stock.prices.pop();
      }
      console.log(stock.prices);
        app.io.emit('tick', {ticker:stock.ticker, price: tickerObj.price, prices:stock.prices});
    }
  }
  forLoop();
}; //end init



})(module.exports);
