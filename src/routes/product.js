const express = require('express');
const { requireSignIn, adminMiddleware } = require('../common-middleware');
const Product = require('../models/product');
const { createProduct } = require('../controller/product');
//const { addCategory, getCategory } = require('../controller/category');
const multer = require('multer');
const router = express.Router();
const shortId = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortId.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage });

router.post('/product/create', requireSignIn, adminMiddleware, upload.array('productPicture'), createProduct);
//router.get('/product/getCategory', getCategory);

module.exports = router;