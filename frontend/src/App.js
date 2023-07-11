import './App.css'
import { useEffect, useState } from "react";
import AnswerCard from './components/AnswerCard';
import ButtonGroup from './components/ButtonGroup';
import QuestionCard from './components/QuestionCard';

function App() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/questions/random');
      const jsonData = await response.json();
      setQuestions(jsonData);
      getRandomQuestion(jsonData);
    } catch (error) {
      console.error('Error Fetching data: ', error);
    }
  }

  const getRandomQuestion = (questions) => {
    const filteredArray = questions.filter((question) => question !== currentQuestion);
    setCurrentQuestion(filteredArray[Math.floor(Math.random() * filteredArray.length)]);
  };

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
  return (<div>Cannot connect to API...</div>)
}

export default App;
