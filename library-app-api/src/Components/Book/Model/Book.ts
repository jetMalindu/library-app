import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import { AUTHOR_COLLECTION } from "../../Author/Model/Author";

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

export const author = mongoose.model(BOOK_COLLECTION, bookSchema);
