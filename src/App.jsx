import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Home from './pages/home';
import Blog from './pages/Blog';
import AllBlogs from './pages/AllBlogs';
import AdminLogin from "./pages/admin/adminLogin";
import Profile from './pages/admin/Profile';
import Errors from "./pages/Errors";
import BlogInfo from "./pages/BlogInfo";
import { Toaster } from "react-hot-toast";
import CreateBlog from "./pages/admin/CreateBlog";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/allblogs" element={<AllBlogs />} />
          <Route path="/bloginfo/:id" element={<BlogInfo />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createblog" element={<CreateBlog />} />
          
          <Route path="/*" element={<Errors />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
}

export default App;
