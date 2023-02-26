// Include rsvp library
var RSVP = require('rsvp');



// Include utility module
var Utility = require("../lib/Utility.js");

// Include views file
var View = require("../views/View.js");

/*This code implements the third task of retrieving the titles of web pages using Promises. It includes the RSVP library for handling promises.

The code starts by checking if an address is provided in the URL or not. If not, it shows an error message using the View module.

If there are multiple addresses given, it creates an array of promises, where each promise resolves to the title of the corresponding address. It then uses the Promise.all 
function to wait for all promises to be resolved and prints the title of each address to the response object using the View module.

If there is only one address given, it creates a single promise that resolves to the title of that address. It then uses the promise's then method to print the title to the 
response object. */
// Task 3
// Implement the above using Promises. You could use any library e.g. RSVP 
getTitlesRSVP = function (req,res) {
	// check if address provided in url or not
	if(req.url.indexOf("address=") == -1){
		View.addressInUrl(res);
		return;
	}

	// set header
	View.header(res);
	// set header title
	View.titleHeader(res);

	// If multiple address given iterate over array
	if(req.query.address instanceof Array){
		var promises = [];
		var arrayLength = req.query.address.length;
		for(var counter = 0;counter < arrayLength; counter++){
			// create promise for url
			promises.push(new RSVP.Promise(function(resolve,reject){
				Utility.reqTitle(req.query.address[counter],function(title){
					resolve(title);
				});
			}));
		}
		
		// Promise.all function takes a list of promises in the given order and returns another promise
		RSVP.all(promises).then(function(resText){
			resText.map(function(item){
				View.title(res,item);
			});
			View.titleFooter(res);
			View.footer(res);
		});
	}else{
		// create promise
		var promise = new RSVP.Promise(function(resolve,reject){
			Utility.reqTitle(req.query.address,function(title){
				resolve(title);// reject if promise
			});
		});

		// bind promis with then 
		promise.then(function(resText){
			View.title(res,resText);
			View.titleFooter(res);
			View.footer(res);
		});
	}
}

module.exports = {
	
	getTitlesRSVP

}