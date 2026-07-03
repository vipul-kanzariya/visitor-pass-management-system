const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
//import files
const connectDb = require("./config/db");
const authRouter = require('./routes/Auth');
const passRouter = require('./routes/pass');
const visitorRouter = require('./routes/visitor');
const checkLogRouter = require('./routes/checkLog');
// const visitorRoutes =require('./routes/visitor');


const app = express();
dotenv.config();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'  
}));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.json({
    msg: "Welcome visitor",
  });
});
app.use('/api/auth',authRouter);
app.use('/api/visitors',visitorRouter);
app.use('/api/pass',passRouter);
app.use('/api/checkLog',checkLogRouter);



// app.use('/api/visitors/',visitorRoutes);

const PORT = process.env.PORT;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listing on http://localhost:${PORT}`);
  });
});
