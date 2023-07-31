const Products = require("../models/products");
const { MSG } = require("../helper/constant");
const { errorResponse, successResponse } = require("../helper/general");
const { StatusCodes } = require("http-status-codes");
const { default: mongoose } = require("mongoose");

/* ------------------  getall product  ------------------ */

module.exports.getAllProduct = {
  controller: async (req, res) => {
    try {
      /*  -----------------  getall product  ----------------- */
      const {
        page,
        productName,
        pagePerRecords,
        sortFieldKey,
        sortKey,
        category,
      } = req.query;
      let query = {};
      let filter = {};

      //Searching for products
      if (productName) {
        query.$or = [
          { productName: { $regex: "^" + productName, $options: "i" } },
          { productMetal: { $regex: "^" + productName, $options: "i" } },
          { category: { $regex: "^" + productName, $options: "i" } },
        ];
      }

      //Sorting
      let sort_query = {};
      if (sortFieldKey && sortKey) {
        sort_query[sortFieldKey] = sortKey;
      }

      //pagination
      let pageNumber = 1;
      if (page) {
        pageNumber = Number(page);
      }
      let skip = parseInt(pageNumber * pagePerRecords) - pagePerRecords;

      if (category) {
        filter.category = category;
      }

      let totleRecode = await Products.find(filter, query).countDocuments();
      let myData = await Products.find(filter, query)
        .limit(pagePerRecords)
        .skip(skip)
        .sort(sort_query);
      res.send(
        successResponse(
          StatusCodes.OK,
          false,
          MSG.FOUND_SUCCESS,
          myData,
          myData.length,
          totleRecode
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

/* -----------------  get Single Product  ----------------- */
module.exports.getSingleProduct = {
  controller: async (req, res) => {
    try {
      const myData = await Products.find({
        _id: new mongoose.Types.ObjectId(req.params.id),
      });
      res.status(200).json({ myData });
    } catch (error) {
      res.status(500).json({ error: error });
      console.log("error", error);
    }
  },
};

/* -----------------  get Single Product Add To Cart  ----------------- */

module.exports.getSingleProductAddtocart = {
  controller: async (req, res) => {
    try {
      const myData = await Products.find({
        _id: new mongoose.Types.ObjectId(req.params.id),
      });
      res.status(200).json({ myData });
    } catch (error) {
      res.status(500).json({ error: error });
      console.log("error", error);
    }
  },
};

/* -----------------  post product  ----------------- */
module.exports.AddProduct = {
  controller: async (req, res) => {
    try {
      if (req.files && Object.keys(req.files).length > 0) {
        req.body.productImage =
          `http://localhost:${process.env.PORT}/${req.files.productImage[0].path}`
            .replace(/\\/g, "/")
            .replace(/^\/+/g, "");
      }
      let data = {
        productName: req.body.productName,
        productImage: req.body.productImage,
        productPrice: req.body.productPrice,
        productSize: req.body.productSize,
        productMetal: req.body.productMetal,
        dummyPrice: req.body.dummyPrice,
        category: req.body.category,
        productDescription: req.body.productDescription,
      };
      /*  ----------------- create a new Product ----------------- */
      let category = await Products.create(data);
      console.log("first product create", category);
      return res.send(
        successResponse(StatusCodes.OK, false, MSG.CREATE_SUCCESS, category)
      );
    } catch (err) {
      console.log(err);
      res.send(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, err.message)
      );
    }
  },
};

/* -----------------  update product  ----------------- */

module.exports.updateProduct = {
  controller: async (req, res) => {
    try {
      if (req.files && Object.keys(req.files).length > 0) {
        console.log("Testing Image update", req.files);
        req.body.productImage = `http://localhost:${process.env.PORT}/${req.files.productImage[0].path}`;
      }

      /*  ----------------- update Product ----------------- */
      const updateProduct = await Products.findByIdAndUpdate(
        { _id: new mongoose.Types.ObjectId(req.params.id) },
        req.body,
        {
          new: true,
        }
      );
      return res.send(
        successResponse(
          StatusCodes.OK,
          false,
          MSG.UPDATE_SUCCESS,
          updateProduct
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

module.exports.deleteProduct = {
  controller: async (req, res) => {
    try {
      /*  ----------------- delete Product ----------------- */
      await Products.findByIdAndRemove({
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
