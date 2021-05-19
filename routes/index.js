var express = require('express');
var router = express.Router();




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Random stock quote generator' });
});

/*
function triggerRandomEvent(){
  if (Math.random() > 0.7) {
    var rnd
        // Run your command. For example, send a message back to the same channel like this:
        io.emit('tick', {ticker:"aapl", price: (150 * (1 + (Math.random())) })
    }
}
*/
/*
const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const getPrice = price => {
  var sleeptime = 5000 * Math.random();
  return sleep(sleeptime).then(v => 150 * Math.random())
}

//getPrice()
//  .then(num => console.log(num))

const forLoop = async _ => {
  for (let index = 0; index < 100; index++) {
    const price = await getPrice()
      io.emit('tick', {ticker:"aapl", price: price});
  }
}

forLoop();
*/
module.exports = router;
