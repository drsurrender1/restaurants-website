import logo from './logo.svg';
import './App.css';
import Router from "./components/Routers";
import {useState} from "react";
import {APIContext} from "./Contexts/APIContext"

function App() {
  const [notification, setNotification] = useState([])
  return (
      //<APIContext.Provider value={{notification, setNotification}}>
            <Router/>
      //</APIContext.Provider>
  );
}

export default App;
