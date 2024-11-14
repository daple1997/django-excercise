import React from "react";
import ItemList from "./components/ItemList";

function App() {
  return (
    <div className="App">
      <header
        className="App-header"
        style={{
          width: "50%",
          margin: "0 auto",
        }}
      >
        <h1>Welcome to the Item Viewer</h1>
      </header>
      <ItemList />
    </div>
  );
}

export default App;
