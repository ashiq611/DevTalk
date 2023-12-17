import { useState } from "react";
import { Link } from "react-router-dom";


const BlogCard = ({blog}) => {
  const [isLoved, setIsLoved] = useState(false);

  const handleLoveClick = () => {
    setIsLoved(!isLoved);
  };
  // Create markup function
  function createMarkup(c) {
    return { __html: c };
  }

  return (
    <div>
      {/* <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src={blog.thumbnail}
            alt="Album"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{blog.title}</h2>
          
          <div
            dangerouslySetInnerHTML={createMarkup(blog.content)}
            className="mt-4 [&> h1]:text-[32px] [&>h1]:font-bold [&>h1]:mb-2.5 [&> h2]:text-[24px] [&>h2]:font-bold [&>h2]:mb-2.5"
          ></div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Listen</button>
          </div>
        </div>
      </div> */}
      <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md my-4">
        <img
          src={blog.thumbnail}
          alt="Post"
          className="w-full h-48 object-cover"
        />

        <div className="p-4">
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
    </div>
  );
};

export default BlogCard;