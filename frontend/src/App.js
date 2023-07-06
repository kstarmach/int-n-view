import './App.css'
import { useEffect, useState } from "react";
import AnswerCard from './components/AnswerCard';
import ButtonGroup from './components/ButtonGroup';
import QuestionCard from './components/QuestionCard';

function App() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/questions/random');
      const jsonData = await response.json();
      setQuestions(jsonData);
    } catch (error) {
      console.error('Error Fetching data: ', error);
    }
  }

  const nextQuestion = () => {
    setShowAnswer(false);
    fetchData();
  }

  if (questions) {
    return (
      <div className="container">
        <div className='block'>
          <QuestionCard data={questions} />
          <AnswerCard showAnswer={showAnswer} data={questions} />
        </div>
        <ButtonGroup showAnswer={showAnswer} setShowAnswer={setShowAnswer} nextQuestion={nextQuestion} />
      </div>
    );
  }
  return (<div>Cannot connect to API...</div>)
}

export default App;
