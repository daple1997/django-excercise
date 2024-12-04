import React, { useEffect, useState } from "react";
import { Checkbox } from "antd";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkedList, setCheckedList] = useState([]);

  const element = {
    padding: "20px",
    margin: "10px",
    backgroundColor: "#F0F8FF",
  };
  const handleChange = (checkedValues) => {
    setCheckedList(checkedValues);
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/items/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div
      style={{
        width: "50%",
        margin: "0 auto",
      }}
    >
      <h1>Items List</h1>
      <div style={element}>
        <Checkbox.Group
          options={items.map((item) => ({ label: item.name, value: item.id }))}
          value={checkedList}
          onChange={handleChange}
        />
      </div>
      <div style={element}>
        <Checkbox.Group
          options={items.map((item) => ({ label: item.name, value: item.id }))}
          disabled
        />
      </div>
    </div>
  );
};

export default ItemList;
