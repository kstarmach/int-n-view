const Card = require('../models/card');
const cardsRouter = require('express').Router();

cardsRouter.get('/', async (req, res) => {
    const cards = await Card.find({});

    res.json(cards);
})

cardsRouter.get('/:cardId', async (req, res) => {
    const { cardId } = req.params;
    try {
        // Find the card by ID and populate the deck field with card objects
        const card = await Card.findById(cardId);

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        res.status(200).json({ card });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})

cardsRouter.put('/:cardId', async (req, res) => {
    const { cardId } = req.params;
    const { scheduledTime } = req.body;

    const card = await Card.findById(cardId);

    card.scheduledTime = scheduledTime;
    const updatedCard = await card.save();

    res.status(200).json(updatedCard);
})

module.exports = cardsRouter;