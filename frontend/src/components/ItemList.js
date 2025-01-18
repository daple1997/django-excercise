import React, { useState } from "react";
import { Checkbox, Button, Row, Col } from "antd";

const ItemList = ({ items }) => {
  const [checkedList, setCheckedList] = useState([]);
  const [itemList, setItemList] = useState(items || []);

  const element = {
    padding: "20px",
    margin: "10px",
    backgroundColor: "#F0F8FF",
  };

  const handleChange = (checkedValues) => {
    setCheckedList(checkedValues);
  };

  const handleDelete = async () => {
    try {
      await Promise.all(
        checkedList.map((id) =>
          fetch(`http://localhost:8000/api/items/${id}/`, { method: "DELETE" })
        )
      );
      const updatedItems = itemList.filter(
        (item) => !checkedList.includes(item.id)
      );
      setItemList(updatedItems);
      setCheckedList([]);
    } catch (error) {
      console.error("Error deleting items:", error);
    }
  };

  return (
    <div
      style={{
        width: "50%",
        margin: "0 auto",
      }}
    >
      <Row justify="center">
        <Col>
          <h1>Item List</h1>
        </Col>
      </Row>
      <div style={element}>
        {itemList.length === 0 ? (
          <div style={{ textAlign: "center", color: "#999" }}>
            <p>There are no items in your inventory. Please add some items.</p>
          </div>
        ) : (
          <>
            <Checkbox.Group value={checkedList} onChange={handleChange}>
              {itemList.map((item) => (
                <div key={item.id} style={{ marginBottom: "10px" }}>
                  <Checkbox value={item.id}>
                    <strong>{item.name}</strong>
                  </Checkbox>
                  <div
                    style={{
                      marginLeft: "25px",
                      fontSize: "0.9em",
                      color: "#666",
                    }}
                  >
                    {item.description}
                  </div>
                </div>
              ))}
            </Checkbox.Group>
            <div style={{ marginTop: "20px", width: "100%" }}>
              <Button type="primary" block onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemList;
