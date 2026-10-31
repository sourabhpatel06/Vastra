import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  mobile: String,
  address: String,
  city: String,
  gender: String,
  role: {
    type: String,
    default: "user"
  },
  status: {
    type: Number,
    default: 1
  },
  info: {
    type: String,
    default: Date().toString()
  }
});


// Hide __v from JSON responses
userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.__v;
  }
});

const User = mongoose.model("User", userSchema);
export default User;
