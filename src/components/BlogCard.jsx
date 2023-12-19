import { useState } from "react";
import { Link } from "react-router-dom";


const BlogCard = ({blog}) => {
  const [isLoved, setIsLoved] = useState(false);

  const handleLoveClick = () => {
    setIsLoved(!isLoved);
  };

  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  // Create markup function
  function createMarkup(c) {
    return { __html: c };
  }

  return (
    <div>
      <div className="max-w-md mx-auto bg-gray-800 text-white rounded-md overflow-hidden shadow-lg">
        {/* Image with shadow */}
        <div className="relative">
          <img
            className="w-min h-48 object-cover object-center rounded-t-md"
            src={blog.thumbnail}
            alt="Blog Post"
          />
          <div className="absolute inset-0 bg-black opacity-50 rounded-t-md"></div>
        </div>

        <div className="p-6">
          {/* Category */}
          <span className="text-blue-500 font-bold uppercase text-sm">
            {blog.category}
          </span>

          {/* Title */}
          <h2 className="mt-2 text-xl font-semibold">{blog.title}</h2>

          <div className="flex items-center mt-4">
            {/* Author Photo */}
            <img
              className="w-8 h-8 rounded-full mr-2"
              src={blog.authorProfile}
              alt="Author"
            />

            {/* Author Name and Date */}
            <div>
              <p className="text-sm font-medium">{blog.authorName}</p>
              <p className="text-sm">{blog.date}</p>
            </div>
          </div>

          {/* Content Box */}
          {/* <p className="mt-4">
           {blog.content}
          </p> */}

          <div
            dangerouslySetInnerHTML={createMarkup(blog.content)}
            className="prose text-white mt-4"
          ></div>

          {/* Read More Button */}
          <Link
            to={`/bloginfo/${blog.id}`}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Read More
          </Link>

          {/* Favorite Button */}
          <button className="mt-4 ml-2 bg-yellow-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-yellow-600 focus:outline-none focus:shadow-outline-yellow">
            Favorite
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;