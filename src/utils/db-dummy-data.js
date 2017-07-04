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


/** DUMMY DATA FOR HOME PAGE QUOTES */
db.getCollection('dailyquotes').insert([
    {
        quote: '“Beauty always represents an inward and inexhaustible equilibrium of forces; and this overwhelms our soul, since it can neither be calculated nor mechanically produced. A sense of beauty can therefore permit us the direct experience of relationships before we can perceive them, in a differentiated manner, with our discursive reason; in this, incidentally, there is a defence for our own physical and psychic well-being, something that we cannot neglect with impunity.”',
        philosopher: 'Titus Burckhardt'
    },
    {
        quote: "If you don't get what you want, you suffer; if you get what you don't want, you suffer; even when you get exactly what you want, you still suffer because you can't hold on to it forever. Your mind is your predicament. It wants to be free of change. Free of pain, free of the obligations of life and death. But change is law and no amount of pretending will alter that reality.",
        philosopher: 'Socrates',
        era: "400 BC",
    },
    {
        quote: "Do not spoil what you have by desiring what you have not; remember that what you now have was once among the things you only hoped for.",
        philosopher: 'Epicurus',
        era: "300 BC",
        associatedIdeas: "Materialism, Atomism"
    }
]);
