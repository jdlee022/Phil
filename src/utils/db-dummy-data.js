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
    },
    {
        quote: "When you wake up in the morning, tell yourself: the people I deal with today will be meddling, ungrateful, arrogant, dishonest, jealous and surly. They are like this because they can't tell good from evil. But I have seen the beauty of good, and the ugliness of evil, and have recognized that the wrongdoer has a nature related to my own - not of the same blood and birth, but the same mind, and possessing a share of the divine. And so none of them can hurt me. No one can implicate me in ugliness. Nor can I feel angry at my relative, or hate him. We were born to work together like feet, hands and eyes, like the two rows of teeth, upper and lower. To obstruct each other is unnatural. To feel anger at someone, to turn your back on him: these are unnatural.",
        philosopher: "Marcus Aurelius",
        era: "150 AD"
    }
]);
