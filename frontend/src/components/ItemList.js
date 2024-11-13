import React, { useEffect, useState } from "react";
import { Checkbox } from "antd";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkedList, setCheckedList] = useState([]);

  const handleChange = (checkedValues) => {
    setCheckedList(checkedValues);
  };

  useEffect(() => {
    // Fetch items from the API
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
    <div>
      <h1>Items List</h1>
      <Checkbox.Group
        options={items.map((item) => ({ label: item.name, value: item.id }))}
        value={checkedList}
        onChange={handleChange}
      />
      <br />
      <Checkbox.Group
        options={items.map((item) => ({ label: item.name, value: item.id }))}
        disabled
        defaultValue={["Apple"]}
      />
    </div>
  );
};

export default ItemList;
