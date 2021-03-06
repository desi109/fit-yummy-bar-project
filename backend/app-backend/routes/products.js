const {Product} = require('../models/product');
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, 'public/uploads');
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
});

const uploadOptions = multer({ storage: storage });


// GET list of all products
// http://localhost:3000/api/v1/products
//
// or GET list of all products from one or more categories
// http://localhost:3000/api/v1/products?categories=2342342,234234
router.get(`/`, async (req, res) =>{
    let filter = {};
    if(req.query.categories)
    {
         filter = {category: req.query.categories.split(',')};
    }

    const productList = await Product.find(filter).populate('category');

    if(!productList) {
        res.status(500).json({success: false});
    } 
    res.send(productList);
});


// GET one product by ID
// http://localhost:3000/api/v1/products/605855d09d38f1a5864b5353
router.get(`/:id`, async (req, res) =>{
    const product = await Product.findById(req.params.id).populate('category');

    if(!product) {
        res.status(500).json({success: false});
    } 
    res.send(product);
});


// POST (add) one product
// http://localhost:3000/api/v1/products
// + Body (with the new product info)
router.post(`/`, uploadOptions.single('image'), async (req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid Category');

    const file = req.file;
    if (!file) return res.status(400).send('No image in the request');

    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: `${basePath}${fileName}`,  // http://localhost:3000/public/upload/image-2323232
        price: req.body.price,
        category: req.body.category,
        isFeatured: req.body.isFeatured
    });

    product = await product.save();

    if (!product) return res.status(500).send('The product cannot be created');

    res.send(product);
});


// PUT (update) one product by ID
// http://localhost:3000/api/v1/products/6055a6a8eafaa314670475cf
// + Body (with updated info)
router.put('/:id', uploadOptions.single('image'), async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id');
    }
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid Category!');

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(400).send('Invalid Product!');

    const file = req.file;
    let imagepath;

    if (file) {
        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        imagepath = `${basePath}${fileName}`;
    } else {
        imagepath = product.image;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: imagepath,
            price: req.body.price,
            category: req.body.category,
            isFeatured: req.body.isFeatured
        },
        { new: true }
    );

    if (!updatedProduct) return res.status(500).send('The product cannot be updated!');

    res.send(updatedProduct);
});



// DELETE one product by ID
// http://localhost:3000/api/v1/products/6055a6a8eafaa314670475cf
router.delete('/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id)
        .then((product) => {
            if (product) {
                return res.status(200).json({
                    success: true,
                    message: 'The product is deleted!'
                });
            } else {
                return res.status(404).json({ success: false, message: 'The product was not found!'});
            }
        })
        .catch((err) => {
            return res.status(500).json({ success: false, error: err });
        });
});


// GET number of all products
// http://localhost:3000/api/v1/products/get/count
router.get(`/get/count`, async (req, res) => {
    const productCount = await Product.countDocuments((count) => count);

    if (!productCount) {
        res.status(500).json({ success: false });
    }
    res.send({
        productCount: productCount
    });
});


// GET some number of  featured products 
// http://localhost:3000/api/v1/products/get/featured/:count
router.get(`/get/featured/:count`, async (req, res) => {
    const count = req.params.count ? req.params.count : 0;
    const products = await Product.find({ isFeatured: true }).limit(+count);

    if (!products) {
        res.status(500).json({ success: false });
    }
    res.send(products);
});


// PUT (upload) gallery images for product with ID 
// http://localhost:3000/api/v1/products/gallery-images/6055a6a8eafaa314670475cf
router.put('/gallery-images/:id', uploadOptions.array('images', 10), async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product ID!');
    }
    const files = req.files;
    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    if (files) {
        files.map((file) => {
            imagesPaths.push(`${basePath}${file.filename}`);
        });
    }

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            images: imagesPaths
        },
        { new: true }
    );

    if (!product) 
    return res.status(500).send('The gallery cannot be updated!');

    res.send(product);
});

module.exports = router;
