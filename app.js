const express = require("express");
const cors = require("cors");
// const mongoose = require("mongoose");

// // For session Storage

// const config = require("./config/database");
// let configuration = process.env.DATABASE || config.database;
// // connect to database
// mongoose.connect(configuration, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//   console.log("mongodb connection established");
// });

// initialize app
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


app.get('*', (req, res) => {
  res.status(404);

  res.json({
    status: false,
    message: "endpoin not found"
  });
});


const PORT = process.env.PORT || 3333;

let server=app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
server.on('clientError', (err, socket) => {
  console.error(err);
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});