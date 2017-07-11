/**
 * @file - manages the routes related to the categories collection in db.
 * Provides api routes to get a list of all categories and to post a new one.
 * 
 * @author - Jon Lee, 6/30/17
 */
const express = require('express');
const router = new express.Router();

const Category = require('../models/category');
const Post = require('../models/post');

/**
 * Called (via axios) in categories.js to display all categories in view
 */ 
router.get('/api/categories', function (req, res) {
    Category.find().then(function (docs) {
        res.json(docs);
    });
});

/**
 * We do not provide the client with the option to hit this route since
 * users cannot create new categories.
 * Instead you can hit this route via Postman and attach a valid body.
 * (See /src/utils/db-dummy-data)
 */ 
router.post('/api/categories', function (req, res) {
        var newCategory = new Category(req.body);

        newCategory.save(function (error, doc) {
            if (error) {
               console.log(error);
               res.json({error: error});
            }
            else {
                console.log(doc);
                res.json({result: doc});
            }
        });
});

module.exports = router;