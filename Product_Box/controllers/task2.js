
// Include async library
var Async = require("async");

// Include utility module
var Utility = require("../lib/Utility.js");

// Include views file
var View = require("../views/View.js");

/*This code includes the async.js library and utilizes it to implement Task 2. The code defines a function getTitlesAsync that takes in a request and response object.

First, the code checks if an address is provided in the URL, and if not, it calls the View.addressInUrl function and returns. If an address is provided, the code sets the header and
header title using View.header and View.titleHeader functions, respectively.

If multiple addresses are given, the code iterates over the array of addresses and creates a function for each address to get its complete URL using the Utility.getCompleteUrl 
function. It then creates another function getCompleteTitle for each address to get the title using Utility.reqTitle function. The getCompleteTitle function is added to a stack to
 be executed asynchronously.

If there is only one address, it directly creates the getCompleteTitle function and adds it to the stack.

Finally, the code executes all the functions in the stack asynchronously using Async.parallel and prints the title for each address using View.title. It sets the footer 
title and footer using View.titleFooter and View.footer functions, respectively. */

// Task 2
// Implement the above using some kind of flow library e.g. async.js
getTitlesAsync = function (req,res) {
	var stack = [];
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
		var arrayLength = req.query.address.length;
		for(var counter = 0;counter < arrayLength; counter++){
			Utility.getCompleteUrl(req.query.address[counter],function(x2){
				var getCompleteTitle = function(callback){
					Utility.reqTitle(x2,function(title){
						callback(null,title);
					});
				}
				// update stack for async implementation
				stack.push(getCompleteTitle);
			});	
		}
	}else{
		var getCompleteTitle = function(callback){
			// use utility module reqTitle function
			Utility.reqTitle(req.query.address,function(title){
				callback(null,title);
			});  
		}
		// update stack for async implementation
		stack.push(getCompleteTitle);
	}

	// async the calls over stack
	Async.parallel(stack,function(err,records){
		if(err){
			console.log("error"+err);
		}
		for(var i = 0;i<records.length;i++){
			// print title
			View.title(res,records[i]);
		}
		// set footer title
		View.titleFooter(res);
		// set footer
		View.footer(res);

	});
};


module.exports = {

	getTitlesAsync

}