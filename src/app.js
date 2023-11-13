const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/dpdkDatabase");
const npbRoutes = require("./routes/npbRoutes"); // Updated route import
const psRoutes = require("./routes/psRoutes"); 
const cors = require('cors')

const app = express();

// Use bodyParser to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
  origin: "*",
  Credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Connect to the database
db.authenticate()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Use the npb routes with /npb prefix
app.use("/npb", npbRoutes); // Updated route usage with /npb prefix
app.use("/ps", psRoutes)

module.exports = app;