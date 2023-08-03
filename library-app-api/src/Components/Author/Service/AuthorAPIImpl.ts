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
  ): Promise<void> => {
    const { first_name, last_name } = req.body;
    try {
      const existingAuthors = await this.authorDAO.getAuthorDAO({
        first_name,
        last_name,
      });

      if (existingAuthors.length > 0) {
        res
          .status(400)
          .json({ message: "First name and last name already exist" , code:400});
      } else {
        await this.authorDAO.insertAuthorDAO(req.body);
        res.status(200).json({ message: "Operation Successful" });
      }
    } catch (error) {
      res.status(400).json({ message: "Database Error" , code:400});
    }
  };

  public getAuthorRestApi = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const existingAuthors = await this.authorDAO.getAuthorDAO({});
      res.status(200).send({ data: existingAuthors });
    } catch (error) {
      res.status(400).json({ message: "Database Error" });
    }
  };
}
