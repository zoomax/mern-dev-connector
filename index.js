const express = require("express");
const cors = require("cors") ; 
const app = express();
const connectDB = require("./config/db") ; 
const user = require("./routes/api/user") ; 
const profile = require("./routes/api/profile")
const auth = require("./routes/api/auth") ; 
const post = require("./routes/api/post") ; 
connectDB() ; 
// initializing middleware 
app.use(cors()) ; 
app.use(express.json())
app.use(express.json({extended : false})) ; 
app.get("/", (req, res) => {
  res.send("api running");
});
app.use('/api/users' , user) ; 
app.use("/api/posts" , post) ; 
app.use("/api/profiles" , profile) ; 
app.use("/api/auth" , auth) ; 
const PORT = process.env.port || 5000;
app.listen(PORT, () => {
  console.log("app is running on port ", PORT);
});
 