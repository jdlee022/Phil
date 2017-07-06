var mongoose = require("mongoose");

var CategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Missing title'],
        minlength: 1,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Missing description'],
        minlength: 1
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        //The ObjectIds will refer to ids in the Post model
        ref: "Post"
    }]
});

var Category = mongoose.model("Category", CategorySchema);

module.exports = Category;