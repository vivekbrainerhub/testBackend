const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
      required: true,
      type: String,
      lowercase: true,
      trim: true,
    },
    lastName: {
      required: true,
      type: String,
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      required: true,
      type: Number,
    },
    email: {
      required: true,
      type: String,
      lowercase: true,
      trim: true,
    },
    password: {
      required: true,
      type: String,
    },
    role: {
      type: Number,
      default: 0,
    },
  
  }, { timestamps: true });

userSchema.pre("save", function (next) {
  const emp = this;
  bcrypt.hash(emp.password, 10, function (err, hash) {
    if (err) return next(err);
    emp.password = hash;
    next();
  });
});

userSchema.statics.generateAuthToken = async (id) => {
  const user = await User.findOne({ _id: id });
  const token = jwt.sign({ _id: id, user }, process.env.JWTPRIVATEKEY, {
    noTimestamp: true,
    expiresIn: "1m",
  });
  // const refreshToken = jwt.sign({_id: id, user}, process.env.JWTPRIVATEKEY2, {
  //     noTimestamp: true,
  //     expiresIn: "1h",
  // });
  return { token };
};

userSchema.statics.comparePassword = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!user) throw new Error("Invalid Email or Password");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid Email or Password");
  return user;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
