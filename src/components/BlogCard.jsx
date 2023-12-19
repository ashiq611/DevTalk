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
      <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md my-4">
        <img
          src={blog.thumbnail}
          alt="Post"
          className="w-full h-48 object-cover"
        />

        <div className="p-4">
          <div className="avatar flex justify-between items-center p-4">
            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={blog.authorProfile} />
            </div>
            <h2>{blog.authorName}</h2>
            <p>{blog.date}</p>
          </div>
          <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="flex justify-between items-center p-4 bg-gray-100">
          <button
            className={`text-red-500 ${isLoved ? "opacity-100" : "opacity-50"}`}
            onClick={handleLoveClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 21l-1.45-1.316C5.4 14.247 2 11.155 2 7.5 2 4.42 4.42 2 7.5 2c1.74 0 3.418.81 4.5 2.09C13.082 2.81 14.76 2 16.5 2 19.58 2 22 4.42 22 7.5c0 3.655-3.4 6.747-8.55 12.184L12 21z"
              />
            </svg>
          </button>
          <Link
            to={`/bloginfo/${blog.id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Read More
          </Link>
        </div>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-lg">
        <img
          className="w-full h-48 object-cover"
          src={blog.thumbnail}
          alt="Blog Cover"
        />
        <div className="p-6">
          <div className="flex items-center mb-4">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={blog.authorProfile}
              alt="Author Avatar"
            />
            <div>
              <p className="text-gray-600 text-sm">By {blog.authorName}</p>
              <p className="font-semibold text-lg">{blog.title}</p>
            </div>
          </div>
          <p className="text-gray-700 text-base">{blog.content}</p>
        </div>
        <div className="p-6 flex justify-between items-center">
          <button
            className={`text-gray-600 ${isLiked ? "text-red-500" : ""}`}
            onClick={handleLike}
          >
            love
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            See more
          </button>
       
        </div>
      </div>
    </div>
  );
};

export default BlogCard;