const router = require('express').Router();
const controller = require('../controllers/products');

router
      .post("/", controller.createProduct)
      .get("/", controller.getAllProduct)
      .patch("/:id", controller.updateProduct)
      .delete("/:id", controller.deleteProduct)
      .put("/:id", controller.deleteProduct);

module.exports = router;
