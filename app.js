const express = require("express");
const session = require('express-session')
const dotenv = require("dotenv");
const connectDb = require("./config/dbConnection");
const { errorHandler } = require("./middleware/errorMiddleware");
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')


// Create instance of express
const app = express();
const PORT = process.env.PORT || 5000;

// Setting up the .env file configs
dotenv.config({ path: "./config/.env" });

// Calling connectdb function
connectDb();

app.use(express.json());

// session handling
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { maxAge: 10 * 60 * 1000 } // Session expiration time in milliseconds (1 minute in this example)
}));

//Session refresh if user is active
app.use((req, res, next) => {
  if (req.session) {
    // Update the session's expiration time to prevent it from expiring
    req.session.touch();
  }
  next();
});

// Dummy route
app.use("/api", require("./routes/userRoutes"));
app.use("/api", require("./routes/menuRoutes"));
app.use("/api", require("./routes/cartRoutes"));

app.use(errorHandler);

// Listen on port
app.listen(PORT, () => {
  console.log(
    `Server started on port ${PORT} In ${process.env.NODE_ENV} mode.`
  );
});
