const { getAll, create } = require('../controllers/purchase.controller');
const express = require('express');
const verityJWT = require('../utils/verifyJWT');

const purchaseRouter = express.Router();

purchaseRouter.route('/purchases')
    .get(verityJWT, getAll)
    .post(verityJWT, create);

/*purchaseRouter.route('/purchases/:id')
    .get(getOne)
    .delete(remove)
    .put(update);*/

module.exports = purchaseRouter;