const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ProductCart = sequelize.define('productcart', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    //productId
    //userId
});

ProductCart.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
}

module.exports = ProductCart;