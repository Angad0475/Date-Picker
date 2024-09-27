import React from "react";
import DatePickerComponent from "./DatePicker";
import './App.css';

function App(){
  return(
    <div className="App">
      <header className="App-header">
        <h1>React Date Picker App</h1>
        <DatePickerComponent/>
      </header>
    </div>
  )
}
export default App;