const usersRouter = require('express').Router();
const User = require('../models/user');
const Card = require('../models/card');
const bcrypt = require('bcrypt');

usersRouter.post('/', async (req, res) => {
    const { email, password } = req.body;

    if (password.length < 5) {
        return res.status(400).json({ error: "Password must be at least 5 characters long!" });
    }

    const saltRounds = 10;
    const paswordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        email,
        paswordHash
    })

    const savedUser = await user.save();

    res.status(200).json(savedUser);

})

usersRouter.get('/', async (req, res) => {
    try {
        // Find all users and populate the deck field with card objects
        const users = await User.find().populate('deck');

        res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

usersRouter.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the user by ID and populate the deck field with card objects
        const user = await User.findById(userId).populate('deck');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

usersRouter.post('/:userId/deck', async (req, res) => {
    const { userId } = req.params;
    const { questionId, scheduledTime } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let card;

        // Check if the user already has a card with the given questionId
        const existingCard = user.deck.find(card => card.questionId === questionId);

        if (existingCard) {
            // Use the existing card
            card = existingCard;
        } else {
            // Create a new card
            card = new Card({ questionId, scheduledTime });
            await card.save();

            // Add the new card to the user's deck
            user.deck.push(card);
            await user.save();
        }

        res.status(200).json({ message: 'Card added to user deck successfully', card });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = usersRouter;