import "./App.css"
import React, { useState } from 'react'
import Nav from "./component/nav/nav";
import Header from "./component/header/header";
import TaskContainer from "./component/tasks/taskContainer";
import { ShowAdd, UserData, UserID } from "./context/context";

function App() {


  const [showAdd, setShowAdd] = useState(false);
  const [userID, setUserID] = useState();

  const [userData,setUserData] = useState([]);
  console.log(userID)

  return (
    <UserData.Provider value={{ userData, setUserData }}>
      <UserID.Provider value={{ userID, setUserID }}>
        <ShowAdd.Provider value={{ showAdd, setShowAdd }} >
          <div className="App">
            <Nav />
            <Header />
            <TaskContainer />
          </div>
        </ShowAdd.Provider>
      </UserID.Provider>
    </UserData.Provider>
  );
}

export default App;
