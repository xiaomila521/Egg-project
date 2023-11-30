"use strict";

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    username: { type: String },
    password: { type: String },
    age: { type: Number },
    sex: { type: String },
    email: { type: String },
    address: { type: String },
    state: { type: Number },
    phone: { type: String },
    createTime: { type: Date, default: Date.now() },
  });
  return mongoose.model("user", UserSchema, "user");
};
