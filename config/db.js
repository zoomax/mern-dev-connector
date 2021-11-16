const mongoose = require("mongoose");
// "config" is a package that's responsible for conofiguring the application based on  a "default.json" file located within
// a "config" folder within project "application" root folder ;
const config = require("config");
const mongodbURI = config.get("mongodbURI"); // gets the value of passed property-name  ;

const connectDB = async () => {
  try {
    await mongoose.connect(mongodbURI, {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex : true  
    });
    console.log("DB Connected ....");
  } catch (err) {
    console.log(err.message , "from mongo db");
    // Exit process with failure ;
    process.exit(1);
  }
};

module.exports = connectDB;
//// "mongodbURI" : "mongodb+srv://hazemhemaily:H_t241199620102025@cluster0.yqghv.mongodb.net/dev-connector?retryWrites=true&w=majority" , 