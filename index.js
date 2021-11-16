const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const user = require("./routes/api/user");
const profile = require("./routes/api/profile");
const auth = require("./routes/api/auth");
const post = require("./routes/api/post");
const PORT = process.env.port || 8000;
connectDB();
// initializing middleware
app.use(cors());
app.use(express.json());
app.use(express.json({ extended: false }));
app.use("/api/users", user);
app.use("/api/posts", post);
app.use("/api/profiles", profile);
app.use("/api/auth", auth);
app.get(express.static("client/build"));
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/client/build`);
});

app.listen(PORT, () => {
  console.log("app is running on port ", PORT);
});