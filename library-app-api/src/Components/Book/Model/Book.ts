import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import { AUTHOR_COLLECTION } from "../../Author/Model/Author";

export interface IBook {
    _id?:string,
    name:string,
    isbn:string,
    author:string
}

const BOOK_SCHEMA_DEFENITION = {
  name: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    ref: AUTHOR_COLLECTION,
  },
};

const bookSchema = new Schema(BOOK_SCHEMA_DEFENITION, {
  versionKey: false,
  _id: true,
});
export const BOOK_COLLECTION = "book";

export const Book = mongoose.model(BOOK_COLLECTION, bookSchema);
