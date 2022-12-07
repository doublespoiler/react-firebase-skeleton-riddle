import skeleman from "./../images/skeleman.png";
import React from "react";
import PropTypes from "prop-types";


function Display(props){
  const { riddle } = props;

  return(
    <div className="main--display">
      <img src={skeleman} 
        className="main--image" 
        alt="skeleman"
      />
      <div className="main--text">
        <h2>asdf</h2>
      </div>
      
    </div>
  )
}

Display.propTypes = {
  riddle: PropTypes.string
}

export default Display;