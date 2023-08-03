import * as express from "express";
import { AuthorAPIImpl } from "./Components/Author/Service/AuthorAPIImpl";
import { AuthorDAO } from "./Components/Author/Service/AuthorDAO";
import mongoose from "mongoose";
import { DBConnect } from "./Database/DBConnect";

const app = express();

const PORT = 8008;


app.use(express.json())

const dbConnect = new DBConnect()
const authorDAO = new AuthorDAO();
const authorAPIImpl = new AuthorAPIImpl(authorDAO);

dbConnect.init()

app.post("/author", authorAPIImpl.postAuthorRestApi);
app.get("/author",authorAPIImpl.getAuthorRestApi);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});