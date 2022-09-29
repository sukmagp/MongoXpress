const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'field name harus ada'],
        minlenght: 3,
        maxlenght: 50
    },
    price: {
        type: Number,
        required: [true],
        minlenght: 1000,
        maxlenght: 100000000
    },
    stock: Number,
    status: {
        type: Boolean,
        default: true
    },
    image_url:{
        type: String
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;