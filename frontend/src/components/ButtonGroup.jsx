

const ButtonGroup = ({ showAnswer, setShowAnswer, nextQuestion }) => {


    if (showAnswer) {
        return (
            <table className="button-group">
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="again">&lt;1m</label>
                            <br />
                            <button id="again" onClick={() => nextQuestion()}>Again</button>
                        </td>
                        <td>
                            <label htmlFor="hard">&lt;6m</label>
                            <br />
                            <button id="hard" onClick={() => nextQuestion()}>Hard</button>
                        </td>
                        <td>
                            <label htmlFor="good">&lt;10m</label>
                            <br />
                            <button id="good" onClick={() => nextQuestion()}>Good</button>
                        </td>
                        <td>
                            <label htmlFor="easy">4d</label>
                            <br />
                            <button id="easy" onClick={() => nextQuestion()}>Easy</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
    return (
        <table className="button-group">
            <tbody>
                <tr>
                    <td>
                        <button onClick={() => setShowAnswer(true)}>show answer</button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default ButtonGroup