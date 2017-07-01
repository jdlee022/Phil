var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    category: {
        type: String,
        minlength: 1
    },
    title: {
        type: String,
        minlength: 1,
        required: [true, 'Missing title']
    },
    text: {
        type: String,
        required: [true, "Missing text"],
        minlength: 1
    },
    date: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    numComments: {
        type: Number
    },
    latestReply: {
        type: String
    }
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;