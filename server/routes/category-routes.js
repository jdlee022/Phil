const express = require('express');

const router = new express.Router();
const Category = require('../models/category');

router.get('/api/categories', function (req, res) {
    Category.find().then(function (docs) {
        console.log("categories found in db:", docs);
        res.json(docs);
    });
});

router.post('/api/category', function (req, res) {
    var newCategory = new Category(req.body);

    newCategory.save(function (error, doc) {
        if (error) {
            console.log(error);
            res.json({success: false});
        }
        else {
            console.log(doc);
            res.json({success: true});
        }
    });
    
});

module.exports = router;