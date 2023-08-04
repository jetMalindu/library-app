import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Select, message } from "antd";
import axios from "axios";
import { Author } from "./types";

interface CreateBookModalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  visibleAuthorModal:boolean
}
interface BookSubmit {
  isbn: string;
  author: string;
  name: string;
}
const CreateBookModal = ({ visible, setVisible,visibleAuthorModal }: CreateBookModalProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [authors, setAuthors] = useState<Author[]>([]);
  const GET_AUTHORS_URL = "http://localhost:8008/authors";
  const POST_BOOK_URL = "http://localhost:8008/book";

  useEffect(() => {
    axios.get(GET_AUTHORS_URL).then((response) => {
      setAuthors(response.data.data);
    });
  }, [visibleAuthorModal]);

  const handleOk = () => {
    setVisible(false);
  };
  const handleFormSubmit = async (newBook: BookSubmit) => {
    try {
      await axios.post(POST_BOOK_URL, newBook);
      messageApi.open({
        type:"success",
        content:"Operation Successful"
      })
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
        title="Create Book"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form onFinish={handleFormSubmit}>
          <Form.Item
            label="Book Name"
            name={"name"}
            rules={[{ required: true, message: "Book Name is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ISBN"
            name="isbn"
            rules={[{ required: true, message: "isbn is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Select Author"
            name="author"
            rules={[{ required: true, message: "Select Author" }]}
          >
            <Select
              options={authors.map((author) => ({
                value: author._id,
                label: `${author.first_name} ${author.last_name}`,
              }))}
            />
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

export default CreateBookModal;
