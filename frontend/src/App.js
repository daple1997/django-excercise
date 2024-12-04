import React from "react";
import ItemList from "./components/ItemList";
import AddItem from "./components/AddItem";

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
        <h1>Welcome to your inventory</h1>
      </header>
      <ItemList />
      <AddItem />
    </div>
  );
}

export default App;
