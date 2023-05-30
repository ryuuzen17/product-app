const express = require("express");
const router = express.Router();
const { getData, createProduct, detailProduct, updateProduct, deleteProduct } = require("../controller/produkController");

router.route("/createUpdate").get(getData).post(createProduct);
router.get("/createUpdate/:id", detailProduct);
router.get("/delete/:id", deleteProduct);
router.post("/update/:id", updateProduct);

module.exports = { router };
