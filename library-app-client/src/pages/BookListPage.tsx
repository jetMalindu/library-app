import { useEffect, useState } from "react";
import BookList from "../components/BookList";
import { Book } from "../components/types";
import { Button, Space, Alert, message } from "antd";
import axios from "axios";
import CreateBookModal from "../components/CreateBookModal";
import CreateAuthorModal from "../components/CreateAuthorModal";

const BookListPage = () => {
  const [book, setBooks] = useState<Book[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [visibleBookModal, setVisibleBookModal] = useState<boolean>(false);
  const [visibleAuthorModal, setVisibleAuthorModal] = useState<boolean>(false);
  const GET_BOOKS_URL = "http://localhost:8008/books";
  useEffect(() => {
    axios.get(GET_BOOKS_URL).then(
      (response) => {
        setBooks(response.data.data);
      },
      (err) => {
        messageApi.open({
          type: "error",
          content: "Something went wrong",
        });
      }
    );
  }, [visibleBookModal]);

  return (
    <>
      {contextHolder}
      {book.length > 0 ? (
        <BookList books={book} />
      ) : (
        <Alert message="Book List Empty" type="info" />
      )}
      <div style={{ height: "100px" }}></div>
      <Space wrap>
        <Button type="primary" onClick={() => setVisibleAuthorModal(true)}>Create Author</Button>
        <Button type="dashed" danger onClick={() => setVisibleBookModal(true)}>
          Create Book
        </Button>
      </Space>
      <CreateBookModal
        setVisible={setVisibleBookModal}
        visible={visibleBookModal}
        visibleAuthorModal
      />
      <CreateAuthorModal
        setVisible={setVisibleAuthorModal}
        visible={visibleAuthorModal}
      />
    </>
  );
};

export default BookListPage;
