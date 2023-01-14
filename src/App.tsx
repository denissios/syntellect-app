import React from "react";
import "./App.css";
import Control1 from "./components/Control1";
import Control2 from "./components/Control2";


function App() {
    return (
        <div className='controls__wrapper'>
            <Control1/>
            <Control2/>
        </div>
    );
}

export default App;
