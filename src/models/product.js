const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    productCode: {
        type: String,
        required: true,
        trim: true
    },
    condition: {
        type: String,
        required: true,
        trim: true
    },
    key_features: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    specification: {
        type: String,
        required: true,
        trim: true
    },
    offers: {
        type: String
    },
    productPictures: [{
        img: { type: String }
    }],
    reviews: [{
        userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        review: String
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category',
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    updatedAt: Date,


}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema);