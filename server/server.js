const express = require("express");
require("./db");
const UsersRouter = require("./routes/userRoute");
const Login = require("./routes/login");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: ['https://rfc-wetteren.vercel.app/'],
  credentials: true
}));

app.use(express.json());

app.use(UsersRouter);
app.use(Login);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://rfc-wetteren.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});
