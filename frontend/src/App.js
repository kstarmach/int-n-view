import './App.css'
import AnswerCard from './components/AnswerCard';
import ButtonGroup from './components/ButtonGroup';
import QuestionCard from './components/QuestionCard';
function App() {
  return (
    <div className="container">
      <div className='question-container'>

        <QuestionCard />
        <AnswerCard />
        <ButtonGroup />
      </div>
    </div>
  );
}

export default App;
