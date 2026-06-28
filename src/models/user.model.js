const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//here you created schema with validation which helps to check the data user send before saving the database document into mangodb
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required for creating a user"],
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid Email address",
      ],
      unique: [true, "Email already exists."],
    },
    name: {
      type: String,
      required: [true, "Name is required for creating an account"],
    },
    password: {
      type: String,
      required: [true, "Password is required for creating an account"],
      minlength: [6, "password should contain more than 6 character"],
      select: false,
    },
    systemUser: {
      type: Boolean,
      default: false,
      immutable: true,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);
//before saving the document whhich is created using the schema run this function to bycrpt the password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  return;
});
//this is for comparing the plain text password and hashed password for safety purpose
userSchema.methods.comparePassword = async function (password) {
  //note “Every user created from this schema WILL HAVE this function.”or userSchema or simply document consist the function comparepassword

  console.log(password, this.password);

  return await bcrypt.compare(password, this.password);
};

//👉 It creates a Model class (constructor function) based on your schema.//Model → gives tools to interact with DB (class)
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;

/*
short summary 

schema
before saving document function encrypt the password 
compare the plain password and hashed password
lastly create model class or simple model for nodejs.

*/
