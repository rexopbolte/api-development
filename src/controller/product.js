const Product = require('../models/product');
const slugify = require('slugify')
const shortId = require('shortid');
const { json } = require('body-parser');

exports.createProduct = (req, res) => {
    const { name,
        price,
        productCode,
        condition,
        key_features,
        description,
        specification,
        category,
        quantity,
        createdBy
    } = req.body;
    let productPictures = [];

    if (req.files.length > 0) {
        productPictures = req.files.map(file => {
            return { img: file.filename }
        })

    }
    //res.status(200).json({ file: req.files, body: req.body })
    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        quantity,
        productCode,
        condition,
        key_features,
        description,
        specification,
        productPictures,
        category,
        createdBy: req.user._id
    });

    product.save(((error, product) => {
        if (error) return res.status(400).json({ error })
        if (product) return res.status(201).json({ product })
    }))
};