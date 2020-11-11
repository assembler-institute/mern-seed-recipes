const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailValidator = require("email-validator");
const beautifyUnique = require("mongoose-beautiful-unique-validation");
require("dotenv").config();

const config = require("../config")[process.env.NODE_ENV || "development"];

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minlength: 3,
    },
    lastname: {
      type: String,
      required: [true, "User last name is required"],
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: emailValidator.validate,
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
    password: {
      type: String,
      required: [true, "User last name is required"],
      trim: true,
      minlength: 8,
    },
    token: { type: String },
  },
  {
    timestamps: true,
  },
);

UserSchema.plugin(beautifyUnique);

UserSchema.pre("save", async function preSave(next) {
  const user = this;

  if (!user.isModified("password")) return next();

  try {
    const hash = await bcrypt.hash(
      user.password,
      parseInt(config.BCRYPT_SALT_ROUNDS),
    );

    user.password = hash;

    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.comparePassword = async function(candidate) {
  return bcrypt.compare(candidate, this.password);
};

const User = mongoose.model("user", UserSchema);

module.exports = User;
