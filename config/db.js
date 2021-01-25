const mongoose = require("mongoose");
// "config" is a package that's responsible for conofiguring the application based on  a "default.json" file located within
// a "config" folder within project "application" root folder ;
const config = require("config");
const mongodbURI = config.get("mongodbURI"); // gets the value of passed property-name  ;

const connectDB = async () => {
  try {
    await mongoose.connect(mongodbURI, {
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("DB Connected ....");
  } catch (err) {
    console.log(err.message);
    // Exit process with failure ;
    process.exit(1);
  }
};

module.exports = connectDB;
