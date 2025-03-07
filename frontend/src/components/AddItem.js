import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";

const AddItemForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "600px",
        margin: "20px auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2>Add New Item</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter the item name!" }]}
        >
          <Input placeholder="Enter item name" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please enter the item description!" },
          ]}
        >
          <Input placeholder="Enter item description" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Item
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddItemForm;
