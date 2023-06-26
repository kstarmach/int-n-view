const ButtonGroup = () => {
    return(
        <table className="button-group">
            <tr>
                <td>
                    <label htmlFor="again">&lt;1m</label>
                    <br />
                    <button id="again">Again</button>
                </td>
                <td>
                    <label htmlFor="hard">&lt;6m</label>
                    <br />
                    <button id="hard">Hard</button>
                </td>
                <td>
                    <label htmlFor="good">&lt;10m</label>
                    <br />
                    <button id="good">Good</button>
                </td>
                <td>
                    <label htmlFor="easy">4d</label>
                    <br />
                    <button id="easy">Easy</button>
                </td>
            </tr>
        </table>
    )
}

export default ButtonGroup