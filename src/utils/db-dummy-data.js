/**
 * To insert multiple categories to the db:
 * Run the mongo CLI, use the app's database and run the following command
 * (or hit the route from /server/routes/category-routes with Postman)
 */
db.categories.insertMany([
    {
        "category": "General",
        "description": "All things philosophy related are fair game."
    },
    {
        "category": "Applied Ethics",
        "description": "Euthanasia, abortion, genetic engineering, just war theory and more..."
    },
    {
        "category": "Memes",
        "description": "Only the dankest of philosophy related memes are welcome here."
    },
    {
        "category": "Metaphysics",
        "description": "Ultimately, what is there? What is it like?"
    },
    {
        "category": "Philosophy of Science",
        "description": "category description"
    },
    {
        "category": "Political Philosophy",
        "description": "How should society be organized, if at all?"
    },
    {
        "category": "Religious Philosophy",
        "description": "category description"
    }
]);