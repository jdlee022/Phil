/**
 * @file - manages the api routes to interact with the post collection from the db
 */
const express = require('express');
const router = new express.Router();

const Category = require('../models/category');
const Post = require('../models/post');

/**
 * Saves a new post to the post collection and
 * updates the corresponding category's array of Post ObjectIds
 * Called (via axios) in /Discuss/newPost.js
 */
router.post('/api/new_post', function (req, res) {
    var newPost = new Post(req.body);

    newPost.save(function (error, doc) {
        if (error) {
            console.log(error);
            res.json({ success: false });
        }
        else {
            Category.findOneAndUpdate({ "category": req.body.category }, { $push: { "posts": doc._id } }, { new: true }, function (err, doc) {
                // Send any errors to the browser
                if (err) {
                    res.json({ error: err });
                }
                // Or send the newDoc to the browser
                else {
                    res.json({ success: true, doc: doc });
                }
            });
        }
    });
});

module.exports = router;