const express = require("express");
const cors = require("cors");
require("dotenv/config");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const corsOptions = {
    origin:'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello to Fitness Tracker API");
});
app.use(cors({
  origin: '*',
  methods: '*',   
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin: *');
  res.header('Access-Control-Allow-Methods: *');
  res.header('Access-Control-Allow-Headers: *');
  next();
});


mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  () => console.log("Database connected")
);

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
