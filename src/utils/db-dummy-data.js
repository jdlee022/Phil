/**
 * To insert multiple categories to the db
 * Run the mongo CLI, use the app's database and run the following command
 */
db.categories.insertMany([
    {
        "topic": "General",
        "description": "All things philosophy related are fair game."
    },
    {
        "topic": "Applied Ethics",
        "description": "Euthanasia, abortion, genetic engineering, just war theory and more..."
    },
    {
        "topic": "Memes",
        "description": "Only the dankest of philosophy related memes are welcome here."
    },
    {
        "topic": "Metaphysics",
        "description": "Ultimately, what is there? What is it like?"
    },
    {
        "topic": "Philosophy of Science",
        "description": "category description"
    },
    {
        "topic": "Political Philosophy",
        "description": "How should society be organized, if at all?"
    },
    {
        "topic": "Religious Philosophy",
        "description": "category description"
    }
]);