const { getAll, create, getOne, remove, update } = require('../controllers/productcart.controller');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');
const productcartRouter = express.Router();

productcartRouter.route('/cart')
    .get(verifyJWT, getAll) 
    .post(verifyJWT, create);

productcartRouter.route('/cart/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = productcartRouter;