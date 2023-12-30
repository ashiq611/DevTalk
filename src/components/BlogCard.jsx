import { useState } from "react";
import { Link } from "react-router-dom";
import { BiLike } from "react-icons/bi";
import { FcLike } from "react-icons/fc";


const BlogCard = ({blog}) => {

 const handleLike = () => {
   // Implement your logic for handling the "Like" button click
   console.log("Liked!");
 };

 const handleFavorite = () => {
   // Implement your logic for handling the "Favorite" button click
   console.log("Favorited!");
 };
  
  // Create markup function
  function createMarkup(c) {
    return { __html: c };
  }

  return (
    <div>
      <div className="w-full mx-auto mt-8 p-4 bg-gray-800 text-white shadow-md rounded-md">
        <img
          src={blog.thumbnail}
          alt="Blog Cover"
          className="w-full h-48 object-fill mb-4 rounded-md"
        />
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <div className="flex flex-col sm:flex-row lg:items-center mb-4">
          <img
            src={blog.authorProfile}
            alt={blog.authorName}
            className="w-10 h-10 rounded-full mb-2 sm:mb-0 sm:mr-2"
          />
          <div>
            <p className="text-gray-300 font-semibold uppercase">{blog.authorName}</p>
            <p className="text-gray-500">{blog.date}</p>
          </div>
        </div>
        <div className="text-gray-300">
          <div
            dangerouslySetInnerHTML={createMarkup(blog.content)}
            className="prose text-white mt-4"
          ></div>
        </div>
        <div className="flex flex-wrap mt-4">
          <div className="badge badge-primary">{blog.category}</div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
          <div className="flex mb-2 sm:mb-0">
            <button
              onClick={handleLike}
              className="flex items-center bg-white text-blue-700 px-4 py-2 rounded-full mr-2 mb-2 sm:mb-0"
            >
              <BiLike />
            </button>
            <button
              onClick={handleFavorite}
              className="flex items-center bg-stone-50 text-white px-4 py-2 rounded-full mr-2 mb-2 sm:mb-0"
            >
              <FcLike />
            </button>
          </div>
          <Link
            to={`/bloginfo/${blog.id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;