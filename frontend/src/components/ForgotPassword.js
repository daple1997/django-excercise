import React, { useState } from "react";
import { Form, Input, Button, Typography, message, Card } from "antd";

const { Title } = Typography;

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      message.success(`Reset link sent to ${values.email}`);
    }, 1000);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      <Card style={{ width: 400, padding: 24 }}>
        <Title level={3} style={{ textAlign: "center" }}>
          Forgot Password
        </Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
