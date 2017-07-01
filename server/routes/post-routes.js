const express = require('express');

const router = new express.Router();
const Post = require('../models/post');

router.post('/api/post/thread', function (req, res) {
    // var newPost = new Post(req.body);

    // newPost.save(function (error, doc) {
    //     if (error) {
    //         console.log(error);
    //         res.json({success: false});
    //     }
    //     else {
    //         console.log(doc);
    //         res.json({success: true});
    //     }
    // });
});

module.exports = router;