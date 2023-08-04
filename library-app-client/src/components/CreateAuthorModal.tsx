import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select, message } from "antd";
import axios from "axios";
import { Author } from "./types";

interface CreateAuthorModalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}
interface AuthorSubmit {
  first_name: string;
  last_name: string;
}
const CreateAuthorModal = ({ visible, setVisible }: CreateAuthorModalProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const POST_AUTHOR_URL = "http://localhost:8008/author";

  const handleOk = () => {
    setVisible(false);
  };
  const handleFormSubmit = async (newBook: AuthorSubmit) => {
    try {
      await axios.post(POST_AUTHOR_URL, newBook);
      messageApi.open({
        type: "success",
        content: "Operation Successful",
      });
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Something went wrong",
      });
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      {contextHolder}
      <Modal
        title="Create Author"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form onFinish={handleFormSubmit}>
          <Form.Item
            label="Author First Name"
            name={"first_name"}
            rules={[{ required: true, message: "First Name is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Author Last Name"
            name={"last_name"}
            rules={[{ required: true, message: "Last Name is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateAuthorModal;
