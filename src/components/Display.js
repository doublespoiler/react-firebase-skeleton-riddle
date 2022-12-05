import skeleman from "./../images/skeleman.png"
function Display(){
  return(
    <div className="main--display">
      <img src={skeleman} 
        className="main--image" 
        alt="skeleman"
      />
      <div className="main--text">
        <h2>Insert Riddle Here</h2>
        <p>asdf</p>
      </div>
      
    </div>
  )
}

export default Display;