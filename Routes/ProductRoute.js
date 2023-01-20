const { MESSAGE } = require("../common/constant");
const express = require("express");
const Product = require("../model/Product");
const router = express.Router();

// create product
router.post("/create", async (req, res) => {
  const params = req.body;

  try {
    if (params.name && params.price) {
      const createProduct = await Product.create(params);
      console.log(createProduct, "createProduct");
      return res.status(200).json({
        success: true,
        data: createProduct,
        message: MESSAGE.PRODUCT_CREATE_SUCESSFULLY,
      });
    } else {
      return res.status(404).send({ message: MESSAGE.BAD_REQUEST });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      result: [],
      message: error.message,
    });
  }
});

// get all users List
router.get("/", (req, res) => {
  let findProduct = {};
  let query = { $or: [{ _id: req.query.id }, { name: req.query.name }] };
  if (req.query.id || req.query.name) {
    Object.assign(findProduct, query);
  }
  Product.find(findProduct, (err, data) => {
    if (err) {
      res.status(500).send({
        message: MESSAGE.INTERNAL_SERVER_ERROR,
      });
    } else {
      res.status(200).send({
        count: data.length,
        data: data,
      });
    }
  });
});

// update product
router.put("/:id", (req, res) => {
  const request = req.body;
  Product.findByIdAndUpdate(req.params.id, request, (err, data) => {
    if (err) {
      res.status(500).send({
        message: MESSAGE.INTERNAL_SERVER_ERROR,
      });
    } else {
      if (data) {
        res.status(200).send({
          message: MESSAGE.PRODUCT_UPDATE_SUCESSFULLY,
        });
      } else {
        res.status(401).send({
          message: MESSAGE.PRODUCT_NOT_FOUND,
        });
      }
    }
  });
});

// get particular Product by id
router.get("/:id", (req, res) => {
  Product.findById(req.params.id, (err, data) => {
    console.log(err, data);
    if (err) {
      res.status(500).send({
        message: MESSAGE.INTERNAL_SERVER_ERROR,
      });
    } else {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(401).send({
          message: MESSAGE.PRODUCT_NOT_FOUND,
        });
      }
    }
  });
});

// delete product
router.delete("/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: MESSAGE.INTERNAL_SERVER_ERROR,
      });
    } else {
      if (data) {
        res.status(200).send({
          message: MESSAGE.PRODUCT_DELETE_SUCESSFULLY,
        });
      } else {
        res.status(401).send({
          message: MESSAGE.USER_NOT_FOUND,
        });
      }
    }
  });
});

module.exports = router;
