const express = require("express");
const cors = require("cors");
const redis = require('redis');
const client = redis.createClient({
	port: 6379,
	host: 'redis'
})

client.on("error", (error) => {
	console.error(error);
})

client.set("name", "Temilola Onaneye", redis.print);
client.set("description", "Casual, Jovial, Passionate and somebody's lover", redis.print);
client.set("joke", `What do you call two birds in love?
Tweethearts!`, redis.print);

const app = express();

// middlewares
app.use(cors());
app.use(express.static(__dirname + "/views"));
app.use(express.json({ limit: "10mb" }));


app.get('/home', (req, res) => {
	res.sendFile(__dirname + "/index.html");
});
app.get("/about", (req, res) => {
	res.sendFile(__dirname + "/about.html");
})


app.get('/details', (req, res) => {
	var name, joke, desc;
	client.get("name", function (e, val) {
		name = val;
	});
	client.get("joke", function (e, val) {
		joke = val;
	});
	client.get("description", function (e, val) {
		desc = val
		res.status(200).json({ name, joke, desc })
	});
})

app.get('*', (req, res) => {
	res.status(404);

	res.json({
		status: false,
		message: "endpoint not found"
	});
});


const PORT = process.env.PORT || 3333;

let server = app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
server.on('clientError', (err, socket) => {
	console.error(err);
	socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
