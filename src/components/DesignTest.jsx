

const DesignTest = () => {
     const post = {
       title: "The Art of Web Development",
       author: {
         name: "John Doe",
         photo: "https://placekitten.com/50/50", // Replace with the actual photo URL
       },
       time: "2 hours ago",
       content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et justo nec quam ultrices blandit ac at quam. Proin auctor eget metus nec elementum.`,
       tags: ["Web Development", "Programming", "Design"],
       image:
         "https://www.boardinfinity.com/blog/content/images/2023/01/Mern.png",
     };

     const handleLike = () => {
       // Implement your logic for handling the "Like" button click
       console.log("Liked!");
     };

     const handleFavorite = () => {
       // Implement your logic for handling the "Favorite" button click
       console.log("Favorited!");
     };
    return (
      <div>
        <div className="max-w-2xl mx-auto mt-8 p-4 bg-gray-800 text-white shadow-md rounded-md">
          <img
            src={blog.thumbnail}
            alt="Blog Cover"
            className="w-full h-48 object-cover mb-4 rounded-md"
          />
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="flex flex-col sm:flex-row items-center mb-4">
            <img
              src={blog.authorProfile}
              alt={blog.authorName}
              className="w-10 h-10 rounded-full mb-2 sm:mb-0 sm:mr-2"
            />
            <div>
              <p className="text-gray-300 font-semibold">{blog.authorName}</p>
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
            <span className="bg-blue-500 text-white px-2 py-1 mr-2 mb-2 rounded-md">
              {blog.category}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
            <div className="flex mb-2 sm:mb-0">
              <button
                onClick={handleLike}
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md mr-2 mb-2 sm:mb-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-4 w-4 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18l8.485-8.485m0 0L18 18M6 6l8.485 8.485m-8.485 0L18 6"
                  />
                </svg>
                Like
              </button>
              <button
                onClick={handleFavorite}
                className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-md mr-2 mb-2 sm:mb-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-4 w-4 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14l-7-3-7 3V3z"
                  />
                </svg>
                Favorite
              </button>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Read More
            </button>
          </div>
        </div>
      </div>
    );
};

export default DesignTest;