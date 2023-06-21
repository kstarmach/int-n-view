const Question = require('../models/question');
const questionsRouter = require('express').Router();

questionsRouter.post('/', async (req, res) => {
    try {
        const { question, answer } = req.body;

        const newQuestion = new Question({
            question,
            answer,
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

questionsRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const singleQuestion = await Question.findById(id);

        res.json(singleQuestion);
    } catch (error) {
        console.error('Error retrieving items:', error);
        res.status(404).json({ error: 'Something went wrong with SINGLE GET!' })
    }
})

questionsRouter.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;

        const patchedQuestion = await Question.findByIdAndUpdate(id, body, { new: true });

        res.status(200).json(patchedQuestion);
    } catch (error) {
        console.error('Error retrieving items:', error);
        res.status(404).json({ error: 'Something went wrong with SINGLE GET!' })
    }
})

questionsRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Question.findByIdAndDelete(id);
        res.status(400).json('question successfully deleted!');
    } catch (error) {
        console.error('Error retrieving items:', error);
        res.status(404).json({ error: 'Something went wrong with SINGLE GET!' })
    }
})

module.exports = questionsRouter;