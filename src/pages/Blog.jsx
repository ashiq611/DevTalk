import { useEffect, useState } from "react";
import { fireDB } from "../firebase.confiq";
import { onValue, ref } from "firebase/database";

import BlogCard from "../components/BlogCard";


const Blog = () => {

    const [AllBlogs, setAllBlogs] = useState([])
    const [loading, setLoading] = useState(true);
     

    useEffect(() => {
      const blogRef = ref(fireDB, "blogs");
      onValue(blogRef, (snapshot) => {
        let blogs = [];
        snapshot.forEach((b) => {
         
            blogs.push({ ...b.val(), id: b.key });
          
        });
        setAllBlogs(blogs);
        setLoading(false);
      });
    }, []);
    // console.log(AllBlogs);
    return (
      <>
        {loading && (
          <div className="h-screen flex justify-between items-center flex-wrap ">
            <div className="flex flex-col gap-4 w-52">
              <div className="flex gap-4 items-center">
                <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
                <div className="flex flex-col gap-4">
                  <div className="skeleton h-4 w-20"></div>
                  <div className="skeleton h-4 w-28"></div>
                </div>
              </div>
              <div className="skeleton h-32 w-full"></div>
            </div>

            <div className="flex flex-col gap-4 w-52">
              <div className="flex gap-4 items-center">
                <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
                <div className="flex flex-col gap-4">
                  <div className="skeleton h-4 w-20"></div>
                  <div className="skeleton h-4 w-28"></div>
                </div>
              </div>
              <div className="skeleton h-32 w-full"></div>
            </div>
          </div>
        )}

        <div className=" min-h-screen py-5 lg:py-10">
          {AllBlogs?.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </>
    );
};

export default Blog;