const productController = require("../../controller/user/product");
const { optionalUserToken } = require("../../middleware/verifyToken");

const { Router } = require("express");

const productRoute = Router();

productRoute.get("/", (req, res) => {
  res.send({ status: 200, message: "product route is working" });
});

productRoute.get("/getAll", optionalUserToken, productController.getAll);
productRoute.get("/byId/:_id", optionalUserToken, productController.byId);
productRoute.get("/search", productController.search);

module.exports = productRoute;
