/**
 * @file - manages the api routes to interact with the post collection from the db
 * 
 * @author - Jon Lee, 7/2/17
 */
const express = require('express');
const router = new express.Router();

const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

/**
 * Saves a new comment to the comment collection and
 * updates adds the id to the corresponding Post and User item
 * Called (via axios) in /Discuss/PostPage.js
 */
router.post('/api/new_comment', function (req, res) {
    var newComment = new Comment(req.body);

    newComment.save(function (error, doc) {
        if (error) {
            console.log(error);
            res.json({ error: error });
        }
        else {
            // Add post to corresponding category collection
            User.findOneAndUpdate({ "_id": req.body.user }, { $push: { "comments": doc._id } }, { new: true }, function (err, doc) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("added comment to user");
                }
            });

            // Add post to corresponding user collection
            Post.findOneAndUpdate({ "_id": req.body.post }, { $push: { "comments": doc._id } }, { new: true }, function (err, doc) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Added comment to post");
                }
            });
            res.json(doc);
        }
    });
});

/**
 * Called (via axios) in categoryPage.js to display all posts in a category
 */ 
router.get('/api/comments/:postId', function (req, res) {
    Comment.find({post: req.params.postId}).then(function (docs) {
        res.json(docs);
    });
});

/** Get a comment by its id */
router.get('/api/comment/:id', function(req, res){
    Comment.findOne({_id: req.params.id}).then(function (docs) {
        res.json(docs);
    });
});

module.exports = router;