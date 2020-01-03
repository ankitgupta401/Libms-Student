const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require('./routes/users');
const bookRoutes = require('./routes/books');

const path = require("path");

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://ankit:' + process.env.MONGO_ATLAS_PW +'@libms-mq4nn.mongodb.net/Libms-users?retryWrites=true&w=majority', { useNewUrlParser: true , useCreateIndex: true , useUnifiedTopology: true })
.then(() => {
console.log('Connected to Database');
})
.catch(() => {
  console.log('Connection Failed');
});

app.use("/images", express.static(path.join("images")));
app.use("/", express.static(path.join(__dirname, "StudentPannel")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
app.use("/api/users" , userRoutes);
app.use("/api/books" , bookRoutes);
app.use( (req,res,next) => {
  res.sendFile(path.join(__dirname, "Libms", "index.html"));
  });
module.exports = app;
