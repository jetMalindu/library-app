import React, { ReactNode } from "react";
import { List } from "antd";
import { Link } from "react-router-dom";
import { BookListProps } from "./types";

const BookList = ({ books }: BookListProps) => {
  return (
    <List
      dataSource={books}
      bordered
      size="small"
      renderItem={(book) => (
        <List.Item>
          <Link
            to={`/books/${book._id}?isbn=${book.isbn}&name=${book.name}&authorFirstName=${book.author.first_name}&authorLastName=${book.author.last_name}`}
          >
            {book.name}
          </Link>
        </List.Item>
      )}
    />
  );
};

export default BookList;
