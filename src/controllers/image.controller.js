const catchError = require('../utils/catchError');
const Image = require('../models/Image');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');

const getAll = catchError(async(req, res) => {
    const results = await Image.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const file = req.file;
    const { producId } = req.body;
    const { url } = await uploadToCloudinary(file);
    await Image.create({ url, producId });
    return res.sendStatus(201);
});


const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const image = await Image.findByPk(id);
    await deleteFromCloudinary(image.url);//Eliminamos la imagen de cloudinary
    await image.destroy();
    return res.sendStatus(204);
});

module.exports = {
    getAll,
    create,
    remove
}