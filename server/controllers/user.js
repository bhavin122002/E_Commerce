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
        console.log("helloo...", hashedPassword);
        // create a new user instance and collect the data
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
          // return success if the new user is added to the database successfully
          .then((result) => {
            res.status(201).send({
              message: "User Created Successfully",
              result,
            });
          })
          // catch error if the new user wasn't added successfully to the database
          .catch((error) => {
            res.status(500).send({
              message: "Error creating user",
              error,
            });
          });
      })
      // catch error if the password hash isn't successful
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
      console.log("User Login", user);
      if (bcrypt.compare(password, user.password)) {
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
      }
    } catch (error) {
      res.status(404).send({ error: error.message });
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
