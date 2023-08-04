import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookListPage from "./pages/BookListPage";
import BookCreatePage from "./pages/BookCreatePage";
import BookDetailPage from "./pages/BookDetailPage";
import AuthorCreatePage from "./pages/AuthorCreatePage";
import { Layout } from "antd";
import './App.css'
const { Content } = Layout;
const App = () => {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<BookListPage />} />
          {/* <Route path="/books/:bookId" element={<BookDetailPage />} />
      <Route path="/create-author" element={<AuthorCreatePage />} />
      <Route path="/create-book" element={<BookCreatePage />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
