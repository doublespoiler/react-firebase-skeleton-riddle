import React, { useState, useEffect } from 'react';
import './App.css';
import Controls from './components/Controls';
import Display from './components/Display';
import { doc, collection, addDoc, onSnapshot, query, where, getDoc} from "firebase/firestore";
import db from "./Firebase";

//TODO: MAKE IT SO WE CAN READ FROM FIREBASE


function App() {

  var startRoom;



  //get the first room from firestore
  //store it in startRoom
  const [currentRoom, setCurrentRoom] = useState(undefined);
  const [roomsCleared, setRoomsCleared] = useState(0);
  const [roomsFailed, setRoomsFailed] = useState(0);
  const [rooms, setRooms] = useState([]);

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

  const handleClick = (answer) => {
    if (currentRoom.correctAnswer == null){
      const nextRoom = currentRoom.answers.indexOf(answer);
      console.log('next room');
      console.log(nextRoom);
      const docRef = doc(db, "rooms", currentRoom.connectedRooms[nextRoom]); 
      getDoc(docRef).then((doc) => {
        if (doc.exists()) {
          setCurrentRoom(doc.data());
        }
      });
    } else if (answer === currentRoom.correctAnswer){

    } else {

    }
    console.log('handleclick');
  }

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
