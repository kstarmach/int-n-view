const AnswerCard = ({ showAnswer, data }) => {
    if (showAnswer) {

        return (
            <div className="answer" >
                {data.answer}
            </div>
        )
    }
    return
}

export default AnswerCard;