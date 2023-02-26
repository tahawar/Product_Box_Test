

	header = function(res){
		if(!res.finished){
			res.write("<html>");
			res.write("<head><title>Get Website Addresses From URL");
			res.write("</title></head>");
			res.write("<body style=\"color:black;text-align:center; background-color:#EDF1D6; padding-top: 250px; \">");
		}
	},
	footer = function(res){
		if(!res.finished){
			res.write("</body>");
			res.write("</html>");	
			res.end();
		}
	},
	titleHeader = function(res){
		if(!res.finished){
			res.write("<h1>Following are the titles of given websites: </h2>");
			res.write("<ul>")
		}
	},
	titleFooter = function(res){
		if(!res.finished){
			res.write("</ul>")
		}
	},
	title = function(res,title){
		if(!res.finished){
			res.write("<li>" + title + "</li>");
		}
	},
	addressInUrl = function(res){
		if(!res.finished){
			res.write("<h2>Enter website address in URL</h2>")
			this.writeFooter(res);
			res.end();
		}	
	},
	errorLog = function(res,msg){
		if(!res.finished){
			res.write(msg);
		}
	}

 module.exports = {
    header,
    footer,
    titleHeader,
    titleFooter,
    title,
    addressInUrl ,
    errorLog
}


