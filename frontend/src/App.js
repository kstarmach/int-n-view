import './App.css'
import { useEffect, useState, useCallback } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NewQuestionForm from './pages/NewQuestionForm'
import AnswerCard from './components/AnswerCard';
import ButtonGroup from './components/ButtonGroup';
import QuestionCard from './components/QuestionCard';

function App() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const getRandomQuestion = useCallback((questions) => {
    const filteredArray = questions.filter((question) => question !== currentQuestion);
    setCurrentQuestion(filteredArray[Math.floor(Math.random() * filteredArray.length)]);
  }, [currentQuestion, setCurrentQuestion]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch('/questions/random');
        const jsonData = await response.json();
        if (response.status === 200) {
          setQuestions(jsonData);
          getRandomQuestion(jsonData);
        } else {
          throw new Error('Request failed with status: ' + jsonData.error);
        }
      } catch (error) {
        console.error('Error Fetching data: ', error);
      }
    }
    fetchData();
  }, [getRandomQuestion]);

  const nextQuestion = () => {
    setShowAnswer(false);
    getRandomQuestion(questions);
  }

  if (questions) {
    return (
      <div className="container">
        <div className='block'>
          <QuestionCard question={currentQuestion.question} />
          <AnswerCard showAnswer={showAnswer} answer={currentQuestion.answer} />
        </div>
        <ButtonGroup showAnswer={showAnswer} setShowAnswer={setShowAnswer} nextQuestion={nextQuestion} />
      </div>
    );
  }

  return (
    <div className="container">
      <div className='block'>
        <NewQuestionForm />
      </div>
    </div>
  )
}

export default App;
