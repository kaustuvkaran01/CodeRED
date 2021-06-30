const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
var session = require('express-session');

app.use(cors());
var sess = {
  secret: 'bunny',
  cookie: {},
  resave: false,
  saveUninitialized: true
};

var strategy = new Auth0Strategy(
  {
    authRequired: false,
    auth0Logout: true,
    domain :'dev-3wsto-4w.us.auth0.com' ,
    clientSecret: 'bunny',
    baseURL: 'http://localhost:4000',
    clientID: 'QOnHJ5T6HTe1ZK7BdYKMN1hQaZBMnInJ',
    issuerBaseURL: 'https://dev-3wsto-4w.us.auth0.com',
    callbackURL:'http://localhost:4000/callback'
  },
  function (accessToken, refreshToken, extraParams, profile, done){
    return done(null,profile);
  }
)

// var userInViews = require('./lib/middleware/userInViews');
// var authRouter = require('./routes/api/auth');
// var indexRouter = require('./routes/api/index');
// var usersRouter = require('./routes/api/users');



passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

dotenv.config({path:'./config/config.env'});

//Connect Database
connectDB();

app.use(express.json());

if(app.get('env') === 'production'){
  sess.cookie.secure = true;
}

app.use(session(sess));


// app.get("/user", (req, res) => {
//   res.send("API still running, why exactly?");
// });

// ROUTES SETUP
// ..
// app.use(userInViews());
// app.use('/', authRouter);
// app.use('/', indexRouter);
// app.use('/', usersRouter);
// ..
//app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/stores",require("./routes/api/stores"));
app.use("/api/toilet",require("./routes/api/toilet"));
app.use("/api/orgs",require("./routes/api/orgs"));
app.use("/api/query",require("./routes/api/query"));


app.listen(4000, () => console.log("Server started on port 4000"));
