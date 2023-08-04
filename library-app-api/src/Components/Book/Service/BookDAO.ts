import { FilterQuery } from "mongoose";
import { Book, IBook } from "../Model/Book";
import { AUTHOR_COLLECTION } from "../../Author/Model/Author";

export class BookDAO {
  public insertBookDAO(data: IBook) {
    const book = new Book(data);
    return book.save();
  }

  public updateBookDAO(_match: FilterQuery<IBook>, data: IBook) {
    return Book.updateOne(_match, data);
  }

  public getAllBooksWithPaginateDAO(page: number, pageSize: number) {
    return Book.find({})
      .populate(AUTHOR_COLLECTION)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();
  }

  public getBookDAO(_match: FilterQuery<IBook>) {
    return Book.find(_match).populate(AUTHOR_COLLECTION);
  }
}
