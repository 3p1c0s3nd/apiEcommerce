const { getAll, create, remove  } = require('../controllers/image.controller');
const express = require('express');
const upload = require('../utils/multer');

const imageRouter = express.Router();

imageRouter.route('/product_images')
    .get(getAll)
    .post(upload.single('image'), create);//para subir imagenes

imageRouter.route('/product_images/:id')
    .delete(remove);

module.exports = imageRouter;