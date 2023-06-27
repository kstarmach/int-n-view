import './App.css'
import { useState } from "react";
import AnswerCard from './components/AnswerCard';
import ButtonGroup from './components/ButtonGroup';
import QuestionCard from './components/QuestionCard';

function App() {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="container">
      <div className='question-container'>

        <QuestionCard />
        <AnswerCard showAnswer={showAnswer} />
        <ButtonGroup showAnswer={showAnswer} setShowAnswer={setShowAnswer} />
      </div>
    </div>
  );
}

export default App;
