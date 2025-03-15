import React, { useState, useEffect } from "react";
import { Checkbox, Button, Row, Col, Form, Input, message } from "antd";
import axios from "axios";

const ItemList = ({ items }) => {
  const [checkedList, setCheckedList] = useState([]);
  const [lastChecked, setLastChecked] = useState();
  const [itemList, setItemList] = useState(items || []);
  const [form] = Form.useForm();

  const element = {
    width: "600px",
    margin: "20px auto",
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
          axios.delete(`http://localhost:8000/api/items/${id}/`)
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

  const handleEdit = async (values) => {
    console.log(`editted values: ${JSON.stringify(values)}`);
    console.log(`lastChecked ${JSON.stringify(lastChecked)}`);
    if (lastChecked) {
      const id = lastChecked.id;
      axios
        .put(`http://localhost:8000/api/items/${id}/`, values)
        .then((response) => console.log("Item updated:", response.data))
        .catch((error) => console.error("Error updating item:", error));

      setItemList((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, ...values } : item
        )
      );
    } else {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/items/",
          values
        );
        message.success("Item added successfully!");
        console.log("Response data:", response.data);
        window.location.reload();
      } catch (error) {
        message.error("Failed to add item. Please try again.");
        console.error("Error:", error);
      }
    }
  };

  return (
    <div>
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
            <Checkbox.Group
              value={checkedList}
              onChange={handleChange}
              style={{ padding: "20px" }}
            >
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
            <div style={{ padding: "20px", width: "30%" }}>
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
                onFinish={(values) => handleEdit(values)}
                form={form}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please enter the item name!" },
                  ]}
                >
                  <Input placeholder="Enter item name" />
                </Form.Item>

                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the item description!",
                    },
                  ]}
                >
                  <Input placeholder="Enter item description" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    {lastChecked ? <>Edit</> : <>Add</>}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemList;
