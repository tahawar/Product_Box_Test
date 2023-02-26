const Bacon = require('baconjs');
// Include utility module
var Utility = require("../lib/Utility.js");

// Include views file
var View = require("../views/View.js");

/* This code is an implementation of the getTitles function that retrieves the title of a web page using Bacon.js, a functional reactive programming library for JavaScript. 
The function first checks if an address is provided in the URL, and if not, displays an error message using the View module. The function then sets the header and header title
 using the View module.

The query string is converted to a Bacon stream, which is then processed using the flatMapConcat function. The flatMapConcat function handles asynchronous requests for
 each address in the stream. The function makes use of the Utility module's reqTitle function to retrieve the title of each web page asynchronously.*/ 

getTitlesBacon = function(req, res) {
  // check if address provided in url or not
  if (req.url.indexOf('address=') === -1) {
    View.addressInUrl(res);
    return;
  }

  // set header
  View.header(res);
  // set header title
  View.titleHeader(res);

  // convert query string to Bacon stream
  const addressStream = Bacon.fromArray(req.query.address);

  // use flatMapConcat to handle async requests for each address
  addressStream
    .flatMapConcat(function(address) {
      return Bacon.fromCallback(function(callback) {
        Utility.reqTitle(address, function(title) {
          callback(title);
        });
      });
    })
    .onValue(function(title) {
      View.title(res, title);
    })
    .onEnd(function() {
      View.titleFooter(res);
      View.footer(res);
    });
};
module.exports = {
	
	getTitlesBacon

}