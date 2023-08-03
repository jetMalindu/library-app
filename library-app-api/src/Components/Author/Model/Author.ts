import * as mongoose from "mongoose";
import { Schema } from "mongoose";

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

export const author = mongoose.model(AUTHOR_COLLECTION, authorSchema);
