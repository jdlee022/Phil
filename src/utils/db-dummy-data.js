/**
 * @file manages data that is used to initialize our database. This is not
 * referenced anywhere else in code but can be used in the mongo CLI
 * to populate the db.
 */

/**
 * To insert multiple categories to the db:
 * Run the mongo CLI, use the app's database and run the following command
 */
db.categories.insertMany([
    {
        "category": "General",
        "description": "All things philosophy related are fair game."
    },
    {
        "category": "Aesthetics",
        "description": "What is beauty?"
    },
    {
        "category": "Applied Ethics",
        "description": "Euthanasia, abortion, genetic engineering, just war theory and more..."
    },
    {
        "category": "Eastern Philosophy",
        "description": "Discuss the various philosophies of South and East Asia, including Chinese philosophy, Indian philosophy, Buddhist philosophy and more..."
    },
    {
        "category": "Epistemology",
        "description": "The nature of knowledge, justification, and the rationality of belief."
    },
    {
        "category": "Ethical Theory",
        "description": "Should you think about your duty, or about the consequences of your actions? Or should you concentrate on becoming a good person?"
    },
    {
        "category": "Logic & Mathematics",
        "description": "What is the basis for reason? How can we prove things with mathematics?"
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
        "category": "Philosophy of Language",
        "description": "Explore the relationship between language and reality."
    },
    {
        "category": "Philosophy of Mind",
        "description": "What is the nature of the mind and what is its relationship to the body?"
    },
    {
        "category": "Philosophy of Religion",
        "description": "The philosophical examination of the central themes and concepts involved in religious traditions."
    },
    {
        "category": "Philosophy of Science",
        "description": "What qualifies as science and what is its purpose?"
    },
    {
        "category": "Political Philosophy",
        "description": "How should society be organized, if at all?"
    },
    {
        "category": "Western Philosophy",
        "description": "Discuss the evolution of western philosophy beginning with Ancient Greece and Rome, extending through central and western Europe and, since Columbus, the Americas."
    }
     
]);


/** 
 * DATA FOR HOME PAGE QUOTES
 * Quote and Philosopher fields required.
 * See dailyQuote model for reference
 */
db.getCollection('dailyquotes').insert([
    {
        quote: "If you don't get what you want, you suffer; if you get what you don't want, you suffer; even when you get exactly what you want, you still suffer because you can't hold on to it forever. Your mind is your predicament. It wants to be free of change. Free of pain, free of the obligations of life and death. But change is law and no amount of pretending will alter that reality.",
        philosopher: 'Socrates',
        era: "470-400 BC",
        associatedIdeas: "Epistemology, Ethics"
    },
    {
        quote: "Do not spoil what you have by desiring what you have not; remember that what you now have was once among the things you only hoped for.",
        philosopher: 'Epicurus',
        era: "341-270 BC",
        associatedIdeas: "Materialism, Atomism"
    },
    // {
    //     quote: "When you wake up in the morning, tell yourself: the people I deal with today will be meddling, ungrateful, arrogant, dishonest, jealous and surly. They are like this because they can't tell good from evil. But I have seen the beauty of good, and the ugliness of evil, and have recognized that the wrongdoer has a nature related to my own - not of the same blood and birth, but the same mind, and possessing a share of the divine. And so none of them can hurt me. No one can implicate me in ugliness. Nor can I feel angry at my relative, or hate him. We were born to work together like feet, hands and eyes, like the two rows of teeth, upper and lower. To obstruct each other is unnatural. To feel anger at someone, to turn your back on him: these are unnatural.",
    //     philosopher: "Marcus Aurelius",
    //     era: "121-180 AD",
    //     associatedIdeas: "Stoicism"
    // },
    {
        quote: "Above all, do not lose your desire to walk. Everyday, I walk myself into a state of well-being & walk away from every illness. I have walked myself into my best thoughts, and I know of no thought so burdensome that one cannot walk away from it. But by sitting still, & the more one sits still, the closer one comes to feeling ill. Thus if one just keeps on walking, everything will be all right.",
        philosopher: 'Soren Kierkegaard',
        era: "1813-1855 AD",
        associatedIdeas: "Existentialism"
    },
    {
        quote: "The individual has always had to struggle to keep from being overwhelmed by the tribe. If you try it, you will be lonely often, and sometimes frightened. But no price is too high to pay for the privilege of owning yourself.",
        philosopher: 'Friedrich Nietzsche',
        era: "1844-1900 AD",
        associatedIdeas: "Existentialism, Metaphysical Voluntarism"
    },
    {
        quote: "Someday, in the distant future, our grand-children's grand-children will develop a new equivalent of our classrooms. They will spend many hours in front of boxes with fires glowing within. May they have the wisdom to know the difference between light and knowledge.",
        philosopher: 'Plato',
        era: "~425-348 BC",
        associatedIdeas: "Platonism"
    },
    {
        quote: "The most important relationship we can all have is the one you have with yourself, the most important journey you can take is one of self-discovery. To know yourself, you must spend time with yourself, you must not be afraid to be alone. Knowing yourself is the beginning of all wisdom.",
        philosopher: 'Aristotle',
        era: "384-322 BC",
        associatedIdeas: "Aristotelianism, Peripatetic School"
    },
    {
        quote: "There is one mind common to all individual men. Every man is an inlet to the same and to all of the same. He that is once admitted to the right of reason is made a freeman of the whole estate. What Plato has thought, he may think; what a saint has felt, he may feel; what at any time has befallen any man, he can understand. Who hath access to this universal mind is a party to all that is or can be done, for this is the only and sovereign agent.",
        philosopher: 'Ralph Waldo Emerson',
        era: "1803-1882 AD",
        associatedIdeas: "Transcendentalism, Individualism"
    },
    {
        quote: "The bud disappears when the blossom breaks through, and we might say that the former is refuted by the latter; in the same way when the fruit comes, the blossom may be explained to be a false form of the plant’s existence, for the fruit appears as its true nature in place of the blossom. The ceaseless activity of their own inherent nature makes these stages moments of an organic unity, where they not merely do not contradict one another, but where one is as necessary as the other; and constitutes thereby the life of the whole.",
        philosopher: 'Georg Wilhelm Friedrich Hegel',
        era: "1770-1831 AD",
        associatedIdeas: "Absolute Idealism, Historicism"
    }

]);
