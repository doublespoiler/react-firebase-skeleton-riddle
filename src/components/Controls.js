

function Controls(){
  return(
    <div className="player--controls">
      <table>
        <tr>
          <td></td>
          <td><button className="player--north">North</button></td>
          <td></td>
        </tr>
        <tr>
          <td><button className="player--west">West</button></td>
          <td></td>
          <td><button className="player--east">East</button></td>
        </tr>
        <tr>
          <td></td>
          <td><button className="player--south">South</button></td>
          <td></td>
        </tr>
      </table>
    </div>
  )
}

export default Controls;