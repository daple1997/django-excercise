import React, { useState, useEffect } from "react";
import { Checkbox, Button, Row, Col, Form, Input } from "antd";
import AddItem from "./AddItem";

const ItemList = ({ items }) => {
  const [checkedList, setCheckedList] = useState([]);
  const [lastChecked, setLastChecked] = useState();
  const [itemList, setItemList] = useState(items || []);
  const [form] = Form.useForm();

  const element = {
    padding: "20px",
    margin: "10px",
    backgroundColor: "#F0F8FF",
  };

  const handleChange = (checkedValues) => {
    const lastId = checkedValues[checkedValues.length - 1];
    const lastItem = items.find((item) => item.id === lastId);
    setLastChecked(lastItem);
    setCheckedList(checkedValues);

    if (lastItem) {
      form.setFieldsValue({
        name: lastItem.name,
        description: lastItem.description,
      });
    }
  };
  //checking if last checked works as intended
  useEffect(() => {
    console.log("Updated lastChecked:", lastChecked);
    if (lastChecked) {
      console.log("name " + lastChecked.name);
      console.log("description " + lastChecked.description);
    }
    console.log("list:" + checkedList);
    console.log("items " + JSON.stringify(items));
  }, [lastChecked, checkedList, items]);

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
            <div style={{ marginTop: "20px", width: "30%" }}>
              <Button
                type="primary"
                style={{
                  backgroundColor: "red",
                  borderColor: "red",
                  color: "white",
                }}
                block
                onClick={handleDelete}
              >
                Delete Selected
              </Button>
              <Form
                name="basic"
                layout="vertical"
                style={{ width: "300px", margin: "20px auto" }}
                onFinish={(values) => console.log("Submitted values:", values)}
                form={form}
              >
                <Form.Item label="name" name="name">
                  <Input />
                </Form.Item>

                <Form.Item label="description" name="description">
                  <Input />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <AddItem />
          </>
        )}
      </div>
    </div>
  );
};

export default ItemList;
