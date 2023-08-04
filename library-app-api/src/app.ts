import * as express from "express";
import { AuthorAPIImpl } from "./Components/Author/Service/AuthorAPIImpl";
import { AuthorDAO } from "./Components/Author/Service/AuthorDAO";
import mongoose from "mongoose";
import { DBConnect } from "./Database/DBConnect";
import { BookAPIImpl } from "./Components/Book/Service/BookAPIImpl";
import { BookDAO } from "./Components/Book/Service/BookDAO";
import * as cors from "cors"

const app = express();

const PORT = 8008;

app.use(express.json());

app.use(cors())

const dbConnect = new DBConnect();
const authorDAO = new AuthorDAO();
const bookDAO = new BookDAO();
const authorAPIImpl = new AuthorAPIImpl(authorDAO);
const bookAPIImpl = new BookAPIImpl(bookDAO);

dbConnect.init();

app.post("/author", authorAPIImpl.postAuthorRestApi);
app.get("/authors", authorAPIImpl.getAuthorsRestApi);
app.get("/author/:id", authorAPIImpl.getAuthorByIdRestApi);
app.put("/author/:id", authorAPIImpl.putAuthorRestApi);

app.post("/book", bookAPIImpl.postBookRestApi);
app.get("/book/:id", bookAPIImpl.getBookByIdRestApi);
app.put("/book/:id", bookAPIImpl.putBookRestApi);
app.get("/books", bookAPIImpl.getBooksRestApi);

app.all('*', (req, res) => {
    res.status(404).json({message:"Route not found" , error:404});
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});


