const Question = require('../models/question');
const questionsRouter = require('express').Router();

questionsRouter.post('/', async (req, res) => {
    try {
        const { question, answer } = req.body;

        const newQuestion = new Question({
            question,
            answer
        })

        const savedQuestion = await newQuestion.save();

        res.status(201).json(savedQuestion);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' })
    }
});

questionsRouter.get('/', async (req, res) => {
    try {
        const allQuestions = await Question.find();

        res.json(allQuestions);
    } catch (error) {
        console.error('Error retrieving items:', error);
        res.status(404).json({ error: 'Something went wrong with GET!' })
    }
})

module.exports = questionsRouter;