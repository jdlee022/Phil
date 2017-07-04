var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Missing text"],
        minlength: 1
    },
    date: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }
});

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;