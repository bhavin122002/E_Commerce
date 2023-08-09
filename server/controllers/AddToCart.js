const { default: mongoose } = require("mongoose");
const Addtocart = require("../models/AddtoCart");
const { MSG } = require("../helper/constant");
const { errorResponse, successResponse } = require("../helper/general");
const { StatusCodes } = require("http-status-codes");
const Product = require("../models/products");

/* ------------------  getall Addtocart  ------------------ */

module.exports.getAllAddtocart = {
  controller: async (req, res) => {
    try {
      /*  -----------------  getall Addtocart  ----------------- */
      const addtocart = await Addtocart.find({});

      res.send(
        successResponse(StatusCodes.OK, false, MSG.FOUND_SUCCESS, addtocart)
      );
    } catch (err) {
      console.log(err);
      res.send(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, err.message)
      );
    }
  },
};

/* ---------------  get Addtocart  --------------- */

module.exports.getAddtocart = {
  controller: async (req, res) => {
    try {
      let getData = {
        userID: req.params.userID,
      };
      console.log("first time getAddtocart......", getData);

      /*  ----------------- find Addtocart by id   ----------------- */
      const addtocart = await Addtocart.find(getData);

      let productIdArr = [];
      addtocart?.map((e) => {
        productIdArr.push(e.productID);
      });

      console.log("productIdArr", productIdArr);

      const product = await Product.find({ _id: { $in: productIdArr } });
      console.log("product", product);
      /*  ----------------- check Addtocart exist ----------------- */
      if (!addtocart) {
        res.send(
          errorResponse(
            StatusCodes.INTERNAL_SERVER_ERROR,
            true,
            MSG.Addtocart_NOT_FOUND
          )
        );
      }
      res.send(
        successResponse(
          StatusCodes.OK,
          false,
          product,
          MSG.FOUND_SUCCESS,
          addtocart
        )
      );
    } catch (err) {
      console.log(err);
      res.send(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, err.message)
      );
    }
  },
};

/* -----------------  post Addtocart  ----------------- */

module.exports.Addaddtocart = {
  controller: async (req, res) => {
    try {
      let data = {
        productID: req.params.productID,
        userID: req.params.userID,
      };
      console.log("first addtocart called", data);
      /*  ----------------- create a new Addtocart ----------------- */
      let addtocart = await Addtocart.create(data);
      return res.send(
        successResponse(StatusCodes.OK, false, MSG.CREATE_SUCCESS, addtocart)
      );
    } catch (err) {
      console.log(err);
      res.send(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, err.message)
      );
    }
  },
};

/* ------------------  update Addtocart  ------------------ */

module.exports.UpdateAddtocart = {
  controller: async (req, res) => {
    try {
      /*  ----------------- find Addtocart by id   ----------------- */
      let addtocart = await Addtocart.findOne({
        _id: new mongoose.Types.ObjectId(req.params.id),
      });

      /*  ----------------- check Addtocart exist   ----------------- */
      if (!addtocart) {
        return res.send(
          errorResponse(StatusCodes.NOT_FOUND, true, MSG.Addtocart_NOT_FOUND)
        );
      }

      /*  ----------------- update Addtocart ----------------- */
      addtocart = await Addtocart.findByIdAndUpdate(
        { _id: new mongoose.Types.ObjectId(req.params.id) },
        req.body,
        {
          new: true,
        }
      );
      res.send(
        successResponse(StatusCodes.OK, false, MSG.UPDATE_SUCCESS, addtocart)
      );
    } catch (err) {
      console.log(err);
      res.send(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, err.message)
      );
    }
  },
};

/* ------------------  delete Addtocart  ------------------ */

module.exports.DeleteAddtocart = {
  controller: async (req, res) => {
    try {
      /*  ----------------- find Addtocart by id   ----------------- */
      let addtocart = await Addtocart.findByIdAndRemove({
        _id: new mongoose.Types.ObjectId(req.params.id),
      });
      console.log("delete id", req.params.id);
      /*  ----------------- check Addtocart exist   ----------------- */
      if (!addtocart) {
        return res.send(
          errorResponse(
            StatusCodes.INTERNAL_SERVER_ERROR,
            true,
            MSG.Addtocart_NOT_FOUND
          )
        );
      }

      /*  ----------------- delete Addtocart ----------------- */
      await Addtocart.findByIdAndRemove(req.query.id)
        .then(() => {
          return res.send(
            successResponse(StatusCodes.OK, false, MSG.DELETE_SUCCESS)
          );
        })
        .catch(() => {
          res.send(
            errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, err.message)
          );
        });
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  },
};
