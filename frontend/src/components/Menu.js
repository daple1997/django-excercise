import React, { useState, useEffect } from "react";
import ItemList from "./ItemList";
import { Row, Col } from "antd";

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
        <Row justify="center">
          <Col>
            <h1>Welcome to your inventory</h1>
          </Col>
        </Row>
      </header>
      {loading ? (
        <Row justify="center">
          <Col>
            <p>Loading..</p>
          </Col>
        </Row>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <>
          <ItemList items={items} />
        </>
      )}
    </div>
  );
};

export default Menu;
