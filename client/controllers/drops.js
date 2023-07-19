const Drops = require("../models/drops");

const getAllProducts = async (req, res) => {
  const { product_title, product_price, Metal, Size, sort, select } = req.query;
  const queryObject = {};

  if (product_title) {
    queryObject.product_title = product_title;
  }

  if (product_price) {
    queryObject.product_price = product_price;
  }

  if (Metal) {
    queryObject.Metal = Metal;
  }

  if (Size) {
    queryObject.Size = Size;
  }

  let apiData = Drops.find(queryObject);

  if (sort) {
    let sortFix = sort.split(",").join(" ");
    apiData = apiData.sort(sortFix);
  }

  if (select) {
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 5;

  let skip = (page - 1) * limit;

  apiData = apiData.skip(skip).limit(limit);

  console.log(queryObject);

  const myData = await apiData;
  console.log("first =>", req.query);
  res.status(200).json({ myData, nbHits: myData.length });
};

const getAllProductsDrops = async (req, res) => {
  const myData = await Drops.find(req.query);
  console.log("first.. =>", req.query);
  res.status(200).json({ myData, nbHits: myData.length });
};

module.exports = {
  getAllProducts,
  getAllProductsDrops,
};
