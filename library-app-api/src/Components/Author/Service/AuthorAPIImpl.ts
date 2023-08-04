import { AuthorDAO } from "./AuthorDAO";
import { Request, Response } from "express";

export class AuthorAPIImpl {
  private authorDAO: AuthorDAO;

  public constructor(authorDAO: AuthorDAO) {
    this.authorDAO = authorDAO;
  }

  public postAuthorRestApi = async (
    req: Request,
    res: Response
  ) => {
    const { first_name, last_name } : {first_name:string, last_name:string} = req.body;
    try {
      const existingAuthors = await this.authorDAO.getAuthorDAO({
        first_name,
        last_name,
      });

      if (existingAuthors.length > 0) {
        res
          .status(400)
          .json({
            message: "First name and last name already exist",
            code: 400,
          });
      } else {
        await this.authorDAO.insertAuthorDAO(req.body);
        res.status(200).json({ message: "Operation Successful" });
      }
    } catch (error) {
      res.status(400).json({ message: "Database Error", code: 400 });
    }
  };

  public getAuthorsRestApi = async (
    req: Request,
    res: Response
  ) => {
    try {
      const existingAuthors = await this.authorDAO.getAuthorDAO({});
      res.status(200).send({ data: existingAuthors });
    } catch (error) {
      res.status(400).json({ message: "Database Error" });
    }
  };

  public getAuthorByIdRestApi = async (req: Request, res: Response) => {
    const _id = req.params.id;
    try {
      const book = await this.authorDAO.getAuthorDAO({ _id });
      if (book.length > 0) {
        res.status(200).json({ data: book });
      } else {
        res.status(404).json({ message: "Author does not exists", code: 404 });
      }
    } catch (error) {
      res.status(400).json({ message: "Database Error", code: 400 });
    }
  };
  
  public putAuthorRestApi = async (req: Request, res: Response) => {
    const _id = req.params.id;
    const { first_name, last_name } : {first_name:string, last_name:string} = req.body;
    try {
      const book = await this.authorDAO.getAuthorDAO({ _id });
      if (book.length > 0) {
        await this.authorDAO.updateAuthorDAO({ _id }, { first_name, last_name});
        res.status(200).json({ message: "Operation Successful" });
      } else {
        res.status(404).json({ message: "Author does not exists", code: 404 });
      }
    } catch (error) {
      res.status(400).json({ message: "Database Error", code: 400 });
    }
  };

}
