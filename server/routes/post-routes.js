/**
 * @file - manages the api routes to interact with the post collection from the db
 */
const express = require('express');
const router = new express.Router();

const Category = require('../models/category');
const Post = require('../models/post');
const User = require('../models/user');

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
            console.log("body inside /api/new_post", req.body);
            // Add post to corresponding category collection
            Category.findOneAndUpdate({ "category": req.body.category }, { $push: { "posts": doc._id } }, { new: true }, function (err, doc) {
                // Send any errors to the browser
                if (err) {
                    // res.json({ error: err });
                    console.log(err);
                }
                // Or send the newDoc to the browser
                else {
                    // res.json({ success: true, doc: doc });
                    console.log("added post to category collection");
                }
            });

            // Add post to corresponding user collection
            User.findOneAndUpdate({ "_id": req.body.userId }, { $push: { "posts": doc._id } }, { new: true }, function (err, doc) {
                // Send any errors to the browser
                if (err) {
                    // res.json({ error: err });
                    console.log(err);
                }
                // Or send the newDoc to the browser
                else {
                    // res.json({ success: true, doc: doc });
                    console.log("Added postId to user", doc);
                }
            });
            res.json({status: "Post submitted"});
        }
    });
});

module.exports = router;