import ReactMarkdown from 'react-markdown';

const AnswerCard = ({ showAnswer, answer }) => {
    if (showAnswer) {

        return (
            <div className="answer" >
                <ReactMarkdown>{answer}</ReactMarkdown>
            </div>
        )
    }
    return
}

export default AnswerCard;