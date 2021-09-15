const mongoose = require('mongoose');
const mongodbErrorHandler = require("mongoose-mongodb-errors");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

/*  passportLocalMongoose takes our User schema and sets up a passport "local"
    authentication strategy using our email as the username field */
UserSchema.plugin(passportLocalMongoose, {usernameField: "email"});

/*  The MongoDBErrorHandler plugin gives us a
    better 'unique' error, rather than: "11000 duplicate key" */
UserSchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model("User", UserSchema);
