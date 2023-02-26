// Include utility module
var Utility = require("../lib/Utility.js");
// Include views file
var View = require("../views/View.js");
// var View2 = require("../views/head.ejs");

// Task 1
// Implement the above task using plain node.js callbacks 

/*The getTitles function takes two arguments: req and res, which represent the request and response objects, respectively. Inside the function, there is an if statement that checks 
if the address parameter is present in the URL. If it is not, the addressInUrl function of the View module is called and the function returns.

If the address parameter is present in the URL, the header and titleHeader functions of the View module are called to set the response headers. If there are multiple addresses in
the query string, the function iterates over them using a for loop and calls the reqTitle function of the Utility module for each address. When the title for an address is returned, 
the title function of the View module is called to print the title. When all titles have been printed, the titleFooter and footer functions of the View module are called to set the 
response footer.
If there is only one address in the query string, the reqTitle function is called once and the same logic is followed to print the title and set the response footer.*/ 


getTitles = function (req,res) {
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
			Utility.reqTitle(req.query.address[counter],function(title){
				// print title
				View.title(res,title);
				if(arrayLength == (counter + 1)){
					// set footer title
					View.titleFooter(res);
					// set footer
					View.footer(res);
				}
			});
		}
	}else{
		// use utility module reqTitle function
		Utility.reqTitle(req.query.address,function(title){
			// print title
			View.title(res,title);
			// set footer title
			View.titleFooter(res);
			// set footer
			View.footer(res);
		});  
	}
};

// This line exports the getTitles function from the module.

module.exports = {
	getTitles,
	

}