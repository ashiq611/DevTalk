import { useEffect, useState } from "react";
import { fireDB } from "../firebase.confiq";
import { onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";
import BlogCard from "../components/BlogCard";


const Blog = () => {

    const [AllBlogs, setAllBlogs] = useState([])
      const user = useSelector((state) => state.userLoginInfo.userInfo);

    useEffect(() => {
      const blogRef = ref(fireDB, "blogs");
      onValue(blogRef, (snapshot) => {
        let blogs = [];
        snapshot.forEach((b) => {
         
            blogs.push({ ...b.val(), id: b.key });
          
        });
        setAllBlogs(blogs);
      });
    }, []);
    // console.log(AllBlogs);
    return (
      <div className=" min-h-screen py-5 lg:py-10 flex gap-10 flex-wrap items-center justify-center">
        {AllBlogs?.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    );
};

export default Blog;