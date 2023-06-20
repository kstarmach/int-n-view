require('dotenv').config();
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI || '';

const app = express();
app.use(express.json());

app.get('/', (_: Request, res: Response) => {
    res.send('hello world')
});

const questionSchema = new mongoose.Schema({
    question: String,
    answer: String
})

const Question = mongoose.model('Question', questionSchema);

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB!');

        app.listen(PORT, () => {
            console.log(`Server is running on port ` + PORT)
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB ' + error)
    })

app.post('/questions', async (req: Request, res: Response) => {
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

app.get('/questions', async (req: Request, res: Response) => {
    try {
        const allQuestions = await Question.find();

        res.json(allQuestions);
    } catch (error) {
        console.error('Error retrieving items:', error);
        res.status(404).json({ error: 'Something went wrong!' })
    }
})