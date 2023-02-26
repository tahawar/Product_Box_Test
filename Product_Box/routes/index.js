// Include express module
var express = require('express');
const port = 3000

// create controller object
var tasksController = require('../controllers/task1.js');
var tasksController2 = require('../controllers/task2.js');
var tasksController3 = require('../controllers/task3.js');
var tasksController4 = require('../controllers/task4.js');
// create node express object
var app = express();
// app.use("/task-1/I/want/title", tasksController )


// Task 1
app.get("/task1/I/want/title", tasksController.getTitles);
// Task 2
app.get("/task2/I/want/title/", tasksController2.getTitlesAsync);
// Task 3
app.get("/task3/I/want/title/", tasksController3.getTitlesRSVP);
// Task 4
app.get("/task4/I/want/title/", tasksController4.getTitlesBacon);

// empty url handling
app.get("*", function (req,res) {
	res.status(404).send('Not found');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
  })
