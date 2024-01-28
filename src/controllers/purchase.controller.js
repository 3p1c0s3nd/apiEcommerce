const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const ProductCart = require('../models/ProductCart');

const getAll = catchError(async(req, res) => {
    const results = await Purchase.findAll({ include: [Product], where : { userId: req.user.id }});
    return res.json(results);
});

const create = catchError(async(req, res) => {

    const productcart = await ProductCart.findAll({ 
        where: { userId: req.user.id },
        attributes: ['productId', 'quantity', 'userId'],});

        const purchases = await Purchase.bulkCreate(productcart);
        await ProductCart.destroy({ where: { userId: req.user.id } });
        return res.json(purchases);

   /* const productcart = await ProductCart.findAll({ where: { userId: req.user.id } });
    productcart.map(async(product) => {
        await Purchase.create({
            userId: req.user.id,
            productId: product.productId,
            quantity: product.quantity
        });
    });
    await ProductCart.destroy({ where: { userId: req.user.id } });
    return res.json({ message: 'Compra realizada' });*/
});


module.exports = {
    getAll,
    create
}