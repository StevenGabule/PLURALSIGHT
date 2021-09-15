const mongoSessionStore = require("connect-mongo");
const dotenv = require('dotenv')
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

dotenv.config()
require('./models/User.model');

const app = express();

// Passport Config
require('./middleware/passport')

const {mongoURI} = require("./config/default");

// mongo options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// connect to db
mongoose
  .connect(mongoURI, options)
  .then(() => console.log('MONGO_CONNECTED'))
  .catch(err => console.log(err))


app.use(express.json());
app.use(express.urlencoded({extended: true}))

const MongoStore = mongoSessionStore(session);

const sessionConfig = {
  name: "connect.sid",
  // secret used for using signed cookies w/ the session
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    mongoUrl: mongoURI,
    client: mongoose.connection.getClient(),
    mongooseConnection: mongoose.connection,
    ttl: 14 * 24 * 60 * 60 // save session for 14 days
  }),
  // forces the session to be saved back to the store
  resave: false,
  // don't save unmodified sessions
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 14 // expires in 14 days
  }
};

/* Apply our session configuration to express-session */
app.use(session(sessionConfig));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  /* custom middleware to put our user data (from passport) on the req.user so we can access it as such anywhere in our app */
  res.locals.user = req.user || null;
  next();
});

app.use('/api', require('./routes/index.router'))

/* Error handling from async / await functions */
app.use((err, req, res, next) => {
  const {status = 500, message} = err;
  res.status(status).json(message);
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`App is running is: ${PORT}`))
