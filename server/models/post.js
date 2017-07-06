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
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Missing userId"]
    },
    username: {
        type: String
    }
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;