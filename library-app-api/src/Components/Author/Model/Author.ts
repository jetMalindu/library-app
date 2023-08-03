import * as mongoose from "mongoose";
import { Schema } from "mongoose";

export interface IAuthor {
  _id: string;
  first_name: string;
  last_name: string;
}
const AUTHOR_SCHEMA_DEFENITION = {
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
};

const authorSchema = new Schema(AUTHOR_SCHEMA_DEFENITION, {
  versionKey: false,
  _id: true,
});
export const AUTHOR_COLLECTION = "author";

export const Author = mongoose.model(AUTHOR_COLLECTION, authorSchema);
