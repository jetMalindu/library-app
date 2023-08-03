import { FilterQuery } from "mongoose";
import { Author, IAuthor } from "../Model/Author";

export class AuthorDAO {
  public insertAuthorDAO(data: IAuthor) {
    const author = new Author(data);
    return author.save();
  }

  public updateAuthorDAO(_match: FilterQuery<IAuthor>, data: IAuthor) {
    return Author.updateOne(_match, data);
  }

  public getAuthorDAO(_match: FilterQuery<IAuthor>) {
    return Author.find(_match);
  }
}
