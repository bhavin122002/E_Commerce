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
      const { userID } = req.params;

      const result = await Addtocart.aggregate([
        {
          $match: { userID: new mongoose.Types.ObjectId(userID) },
        },
        {
          $lookup: {
            from: "products",
            localField: "productAddToCart.productID",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: "$productAddToCart",
        },
        {
          $addFields: {
            product: {
              $arrayElemAt: ["$product", 0],
            },
          },
        },
        {
          $group: {
            _id: {
              _id: "$_id",
              userID: "$userID",
              createdAt: "$createdAt",
              updatedAt: "$updatedAt",
            },
            productAddToCart: {
              $push: {
                productID: "$productAddToCart.productID",
                count: "$productAddToCart.count",
                _id: "$productAddToCart._id",
                product: "$product",
              },
            },
          },
        },
        {
          $project: {
            _id: "$_id._id",
            userID: "$_id.userID",
            productAddToCart: 1,
            createdAt: "$_id.createdAt",
            updatedAt: "$_id.updatedAt",
          },
        },
      ]);

      // /*  ----------------- check Addtocart exist ----------------- */
      if (!result) {
        res.send(
          errorResponse(
            StatusCodes.INTERNAL_SERVER_ERROR,
            true,
            MSG.Addtocart_NOT_FOUND
          )
        );
      }
      res.send(
        successResponse(StatusCodes.OK, false, MSG.FOUND_SUCCESS, result[0])
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
      /*  ----------------- create a new Addtocart ----------------- */
      const { userID } = req.params;
      const { productID, count } = req.body;

      const ProductObjectId = new mongoose.Types.ObjectId(productID);

      const existData = await Addtocart.findOne({ userID });

      let result;

      if (existData) {
        const matchProductIndex = existData.productAddToCart.findIndex((item) =>
          item.productID.equals(ProductObjectId)
        );

        if (matchProductIndex !== -1) {
          existData.productAddToCart[matchProductIndex].count = count;
        } else {
          existData.productAddToCart.push({
            productID: ProductObjectId,
            count,
          });
        }

        result = await existData.save();
      } else {
        const newCart = new Addtocart({
          userID,
          productAddToCart: [{ productID: ProductObjectId, count }],
        });
        result = await newCart.save();
      }
      return res.send(
        successResponse(StatusCodes.OK, false, MSG.CREATE_SUCCESS, result)
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

      const { id, userID } = req.params;

      const existData = await Addtocart.findOne({ userID });
      console.log("addtocart", existData);
      const ProductObjectId = new mongoose.Types.ObjectId(id);
      console.log("ProductObjectId", ProductObjectId);

      if (existData) {
        const matchProductIndex = existData.productAddToCart.findIndex((item) =>
          item.productID.equals(ProductObjectId)
        );

        console.log("first match", matchProductIndex);

        if (matchProductIndex !== -1) {
          const productToDelete = existData.productAddToCart[matchProductIndex];
          let addtocart = await Addtocart.deleteOne({
            productID: productToDelete.productID,
          });
          console.log("first addtocart", addtocart);
          if (addtocart.deletedCount > 0) {
            console.log("Product deleted from cart:", productToDelete);
          } else {
            console.log("Delete Failed...");
          }
        } else {
          console.log("Delete Failed...");
        }
      }
      let addtocart = await existData.save();

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
