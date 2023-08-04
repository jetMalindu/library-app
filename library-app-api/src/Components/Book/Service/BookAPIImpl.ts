import { Request, Response } from "express";
import { BookDAO } from "./BookDAO";

export class BookAPIImpl {
  private bookDAO: BookDAO;
  public constructor(bookDAO: BookDAO) {
    this.bookDAO = bookDAO;
  }

  public postBookRestApi = async (req: Request, res: Response) => {
    const {
      name,
      author,
      isbn,
    }: { name: string; author: string; isbn: string } = req.body;
    try {
      const existingBooks = await this.bookDAO.getBookDAO({ isbn });
      if (existingBooks.length > 0) {
        res.status(400).json({
          message: "ISBN is already exist",
          code: "400",
        });
      } else {
        await this.bookDAO.insertBookDAO({ name, author, isbn });
        res.status(200).json({ message: "Operation Successful" });
      }
    } catch (error) {
      res.status(400).json({ message: "Database Error", code: 400 });
    }
  };

  public getBooksRestApi = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    try {
      const existingBooks = await this.bookDAO.getAllBooksWithPaginateDAO(
        page,
        pageSize
      );
      res.status(200).send({ data: existingBooks });
    } catch (error) {
      res.status(400).json({ message: "Database Error" });
    }
  };

  public getBookByIdRestApi = async (req: Request, res: Response) => {
    const _id = req.params.id;
    try {
      const book = await this.bookDAO.getBookDAO({ _id });
      if (book.length > 0) {
        res.status(200).json({ data: book });
      } else {
        res.status(404).json({ message: "Book does not exists", code: 404 });
      }
    } catch (error) {
      res.status(400).json({ message: "Database Error", code: 400 });
    }
  };

  public putBookRestApi = async (req: Request, res: Response) => {
    const _id = req.params.id;
    const {
      name,
      author,
      isbn,
    }: { name: string; author: string; isbn: string } = req.body;
    try {
      const book = await this.bookDAO.getBookDAO({ _id });
      if (book.length > 0) {
        await this.bookDAO.updateBookDAO({ _id }, { name, author, isbn });
        res.status(200).json({ message: "Operation Successful" });
      } else {
        res.status(404).json({ message: "Book does not exists", code: 404 });
      }
    } catch (error) {
      res.status(400).json({ message: "Database Error", code: 400 });
    }
  };
}
