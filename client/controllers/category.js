const { default: mongoose } = require("mongoose");
const Category = require("../models/category");
const { MSG } = require("../helper/constant");
const { errorResponse, successResponse } = require("../helper/general");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

/* ------------------  getall category  ------------------ */

module.exports.getAllCategory = {
  controller: async (req, res) => {
    try {
      /*  -----------------  getall category  ----------------- */
      const category = await Category.find({});
      res.send(
        successResponse(StatusCodes.OK, false, MSG.FOUND_SUCCESS, category)
      );
    } catch (err) {
      console.log(err);
      res.send(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, err.message)
      );
    }
  },
};

/* ---------------  get category  --------------- */

module.exports.getCategory = {
  controller: async (req, res) => {
    try {
      /*  ----------------- find category by id   ----------------- */
      const category = await Category.findById(req.query.id);

      /*  ----------------- check category exist ----------------- */
      if (!category) {
        res.send(
          errorResponse(
            StatusCodes.INTERNAL_SERVER_ERROR,
            true,
            MSG.CATEGORY_NOT_FOUND
          )
        );
      }
      res.send(
        successResponse(StatusCodes.OK, false, MSG.FOUND_SUCCESS, category)
      );
    } catch (err) {
      console.log(err);
      res.send(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, err.message)
      );
    }
  },
};

/* -----------------  post category  ----------------- */

module.exports.AddCategory = {
  controller: async (req, res) => {
    try {
      if (req.files && Object.keys(req.files).length > 0) {
        req.body.categoryImage = `localhost:${process.env.PORT}/${req.files.image[0].path}`;
      }
      /*  ----------------- create a new category ----------------- */
      let category = await Category.create(req.body);
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

/* ------------------  update category  ------------------ */

module.exports.UpdateCategory = {
  controller: async (req, res) => {
    try {
      for (let key in req.body) {
        if (req.body[key] == "") {
          delete req.body[key];
        }
      }

      /*  ----------------- find category by id   ----------------- */
      let category = await Category.findOne({
        _id: new mongoose.Types.ObjectId(req.params.id),
      });

      /*  ----------------- check category exist   ----------------- */
      if (!category) {
        return res.send(
          errorResponse(StatusCodes.NOT_FOUND, true, MSG.CATEGORY_NOT_FOUND)
        );
      }

      /*  ----------------- update category ----------------- */
      category = await Category.findByIdAndUpdate(
        { _id: new mongoose.Types.ObjectId(req.params.id) },
        req.body,
        {
          new: true,
        }
      );
      res.send(
        successResponse(StatusCodes.OK, false, MSG.UPDATE_SUCCESS, category)
      );
    } catch (err) {
      console.log(err);
      res.send(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, err.message)
      );
    }
  },
};

/* ------------------  delete category  ------------------ */

module.exports.DeleteCategory = {
  controller: async (req, res) => {
    /*  ----------------- find category by id   ----------------- */
    let category = await Category.findByIdAndRemove(
      { _id: new mongoose.Types.ObjectId(req.params.id) }
      // createdBy: req.user._id,
    );

    /*  ----------------- check category exist   ----------------- */
    if (!category) {
      return res.send(
        errorResponse(
          StatusCodes.INTERNAL_SERVER_ERROR,
          true,
          MSG.CATEGORY_NOT_FOUND
        )
      );
    }

    /*  ----------------- delete category ----------------- */
    await Category.findByIdAndRemove(req.query.id)
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
  },
};
