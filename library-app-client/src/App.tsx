import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookListPage from "./pages/BookListPage";
import BookDetailPage from "./pages/BookDetailPage";
import { Layout } from "antd";
import './App.css'
const { Content } = Layout;
const App = () => {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<BookListPage />} />
          <Route path="/books/:bookId" element={<BookDetailPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
