import { ReactNode } from "react";
import BookList from "../components/BookList";
import { Descriptions } from "antd";

const BookDetailPage = () => {
  const location = window.location;
  const isbn = new URLSearchParams(location.search).get("isbn");
  const name = new URLSearchParams(location.search).get("name");
  const authorFirstName = new URLSearchParams(location.search).get(
    "authorFirstName"
  );
  const authorLastName = new URLSearchParams(location.search).get(
    "authorLastName"
  );
  return (
    <Descriptions title="Book Info">
      <Descriptions.Item label="Book Name">{name}</Descriptions.Item>
      <Descriptions.Item label="ISBN">{isbn}</Descriptions.Item>
      <Descriptions.Item label="Author">
        {`${authorFirstName} ${authorLastName}`}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default BookDetailPage;
