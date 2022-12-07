import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Controls from './components/Controls';
import Display from './components/Display';
import { doc, collection, addDoc, onSnapshot, query, where, getDoc} from "firebase/firestore";
import db from "./Firebase";

//TODO: MAKE IT SO WE CAN READ FROM FIREBASE


function App() {

  //get the first room from firestore
  //store it in startRoom
  const [currentRoom, setCurrentRoom] = useState(undefined);
  const [roomsCleared, setRoomsCleared] = useState(0);
  const [roomsFailed, setRoomsFailed] = useState(0);

  const goToRoom = (answer) => {
    const nextRoom = currentRoom.answers.indexOf(answer);
    const docRef = doc(db, "rooms", currentRoom.connectedRooms[nextRoom]); 
    getDoc(docRef).then((doc) => {
      if (doc.exists()) {
        setCurrentRoom(doc.data());
        console.log("next room");
        console.log(doc.data());
        //if the next room is "start" (which means we'd restart the game)
        if(currentRoom.connectedRooms[0] === "start"){
          //reset rooms cleared and fail state, triggering their useEffects
          setRoomsFailed(0);
          setRoomsCleared(0);
        }
      } else {
        window.alert("Room does not exist!" + currentRoom.connectedRooms[nextRoom]);
      }
    });
  }

  const handleClick = (answer) => {
    if (answer == null){
      window.alert("please pick a valid answer");
    } else if (answer === "death"){
      goToRoom("death");
    }
      else if (currentRoom.correctAnswer == null || answer === currentRoom.correctAnswer){
      goToRoom(answer);
      setRoomsCleared(roomsCleared + 1);
    } else {
      window.alert("You answered wrong!");
      setRoomsFailed(roomsFailed + 1);
      if(roomsFailed >= 3){
        if(roomsFailed === 3){
          goToRoom("death");
        }
      } else {
        goToRoom(answer);
      }
    }
    console.log('handleclick');
  }

  //setting the initial room
  useEffect(() => {
    //this is how we get a specific doc from firestore
    const docRef = doc(db, "rooms", "start");
    // since getDoc() returns a Promise, we have to use .then()
    getDoc(docRef).then((doc) => {
      if (doc.exists()) {
        setCurrentRoom(doc.data());
        console.log("room set");
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
  }, []); //only does once, empty dependency array

  useEffect(() => {
    const cleared = document.getElementById("rooms-cleared");
    cleared.innerText = roomsCleared;
  }, [roomsCleared]);

  useEffect(() => {
    const failed = document.getElementById("rooms-failed");
    failed.innerText = roomsFailed;
  }, [roomsFailed]);

  return (
    <main>
      MAIN
      {/* Because we are using Promises/async for getting the data for the props, 
      we have to use conditional rendering for the components that use those props, 
      otherwise they will try to render before the Promise is fulfilled */}
      { currentRoom && <Display riddle={currentRoom.riddle}/> }
      { currentRoom && <Controls 
        answers={currentRoom.answers} 
        connectedRooms={currentRoom.connectedRooms} 
        correctAnswer={currentRoom.correctAnswer}
        onClick={handleClick}
      /> }
    </main>
  );
}

export default App;
