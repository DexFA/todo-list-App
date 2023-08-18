import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const todo = [];
const todoWork = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Get the date
const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
const d = new Date();
const dayName = days[d.getDay()];
const nameOfMonth = new Intl.DateTimeFormat("en-US", {
	month: "long",
}).format(d);

const today = `${dayName}, ${nameOfMonth} ${d.getDate()}`;

app.get("/", (req, res) => {
	res.render("index.ejs", {
		today: today,
	});
});

app.get("/work", (req, res) => {
	res.render("work.ejs");
});

app.post("/todo-today", (req, res) => {
	todo.push(req.body.todo);
	console.log(today);
	res.render("index.ejs", {
		todoItem: todo,
	});
});

app.post("/todo-work", (req, res) => {
	todoWork.push(req.body.todo);
	res.render("work.ejs", {
		todoItem: todoWork,
	});
});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
