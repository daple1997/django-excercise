import React, { useState } from "react";
import { Checkbox, Button, Flex } from "antd";

const ItemList = ({ items }) => {
  const [checkedList, setCheckedList] = useState([]);

  const element = {
    padding: "20px",
    margin: "10px",
    backgroundColor: "#F0F8FF",
  };
  const handleChange = (checkedValues) => {
    setCheckedList(checkedValues);
  };

  return (
    <div
      style={{
        width: "50%",
        margin: "0 auto",
      }}
    >
      <h1>Items List</h1>
      <div style={element}>
        <Checkbox.Group value={checkedList} onChange={handleChange}>
          {items.map((item) => (
            <div key={item.id} style={{ marginBottom: "10px" }}>
              <Checkbox value={item.id}>
                <strong>{item.name}</strong>
              </Checkbox>
              <div
                style={{ marginLeft: "25px", fontSize: "0.9em", color: "#666" }}
              >
                {item.description}
              </div>
            </div>
          ))}
        </Checkbox.Group>
        <Flex vertical gap="small" style={{ width: "100%" }}>
          <Button type="primary" block>
            Delete
          </Button>
        </Flex>
      </div>
    </div>
  );
};

export default ItemList;
