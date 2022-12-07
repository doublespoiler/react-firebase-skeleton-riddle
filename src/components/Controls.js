function Controls(props){

  const { answers, connectedRooms, correctAnswer, onClick} = props;

  console.log(answers);
  console.log(connectedRooms);
  console.log(correctAnswer);

  return(
    <div className="player--controls">
        <table>
          <tr>
            <td></td>
            <td><button className="player--north" onClick={() => onClick(answers[2])}>{answers[2]} </button></td>
            <td></td>
          </tr>
          <tr>
            <td><button className="player--west" onClick={() => onClick(answers[0])}>{answers[0]}</button></td>
            <td></td>
            <td><button className="player--east" onClick={() => onClick(answers[1])}>{answers[1]}</button></td>
          </tr>
          <tr>
            <td></td>
            <td><button className="player--south" onClick={() => onClick(answers[3])}>{answers[3]}</button></td>
            <td></td>
          </tr>
        </table>
    </div>
  )
}

export default Controls;