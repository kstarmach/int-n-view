import ReactMarkdown from 'react-markdown';

const AnswerCard = ({ showAnswer, data }) => {
    if (showAnswer) {

        return (
            <div className="answer" >
                <ReactMarkdown>{data.answer}</ReactMarkdown>
            </div>
        )
    }
    return
}

export default AnswerCard;