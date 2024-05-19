const express = require("express");
require("./db");
const UsersRouter = require("./routes/userRoute");
const Login = require("./routes/login");
const Agenda = require("./routes/agenda.route");
const Gestionnaire = require("./routes/gestionnaire.route");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const app = express();
<<<<<<< HEAD
app.use(cookieParser());

app.use(cors({
  origin: ['https://rfc-wetteren.vercel.app', 'http://localhost:5173'],
  credentials: true
}));

=======
>>>>>>> 0abec3a62b5a27ce02ab70bb0683447ce184ef96

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, UPDATE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Bearer');
  next();
});


app.use(cors({
  origin: ['https://rfc-wetteren.vercel.app'],
  credentials: true
}));

app.use(express.json());
app.use(UsersRouter);
app.use(Login);
app.use(Agenda);
app.use(Gestionnaire);

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  const tokenCookie = req.cookies.token;
  if (!tokenCookie) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.clearCookie('JWT_TOKEN', { httpOnly: true, secure: true, sameSite: true });
      res.clearCookie('token', { httpOnly: true, secure: true, sameSite: true });
      return res.redirect('/');
    });
  } else {
    next();
  }
});


app.listen(8000, () => {
  console.log("Server listening on port 8000");
});
