const User = require("../models/user");
const bcrypt = require("bcrypt");
const { MSG } = require("../helper/constant");
const { errorResponse, successResponse } = require("../helper/general");
const { StatusCodes } = require("http-status-codes");
const jsonwebtoken = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

module.exports.getAllUser = {
  controller: async (req, res) => {
    try {
      const adminData = await User.find({});
      return res.status(200).json({ adminData, nbHits: adminData.length });
    } catch (error) {
      res.status(500).json({ error: error });
      console.log("error", error);
    }
  },
};

module.exports.Registration = {
  controller: async (req, res) => {
    console.log("first request");
    // hash the password
    bcrypt
      .hash(req.body.password, 10)
      .then((hashedPassword) => {
        const user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hashedPassword,
          role: req.body.role,
        });
        console.log("user created", user);
        user
          .save()
          .then((result) => {
            res.status(200).send({
              message: "User Created Successfully",
              result,
            });
          })
          .catch((error) => {
            alert("User AllReady Registered Plz Different Email Id Entered")
            res.status(500).send({
              message: "Error creating user",
              error,
            });
          });
      })
      .catch((error) => {
        res.status(500).send({
          message: "Password was not hashed successfully",
        });
        console.log("Password was not hashed successfully", error);
      });
  },
};

module.exports.Login = {
  controller: async (req, res) => {
    try {
      const { email, password } = req.body;

      let user = await User.findOne({
        email: email,
      });

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      console.log("User Login", user);
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        let token = jsonwebtoken.sign(
          {
            id: user._id,
          },
          process.env.SECRET_KEY
        );

        let TokenUser = await User.findById(user._id);
        TokenUser = { ...TokenUser._doc };
        TokenUser.Token = token;
        res
          .status(200)
          .send({ message: "Users Successfully Login", result: TokenUser });
      } else {
        alert("Invalid Password");
        return res.status(401).json({ message: "Invalid Password" });
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },
};

module.exports.LogOut = {
  controller: async (req, res) => {
    try {
      /*  ----------------- logout user ----------------- */
      await User.findByIdAndRemove({
        _id: new mongoose.Types.ObjectId(req.params.id),
      });
      return res.send(
        successResponse(StatusCodes.OK, false, MSG.DELETE_SUCCESS)
      );
    } catch (err) {
      console.log(err);
      res.send(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, err.message)
      );
    }
  },
};
