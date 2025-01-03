import React, { useState, useEffect } from "react";
import ItemList from "./ItemList";
import AddItem from "./AddItem";

const Menu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = () => {
    setLoading(true);
    fetch("http://localhost:8000/api/items/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setItems(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <header
        className="App-header"
        style={{
          width: "50%",
          margin: "0 auto",
        }}
      >
        <h1>Welcome to your inventory</h1>
      </header>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <ItemList items={items} />
      )}
      <AddItem />
    </div>
  );
};

export default Menu;
