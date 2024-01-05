import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiSelfLove } from "react-icons/gi";
import { AiOutlineComment } from "react-icons/ai";
import { onValue, push, ref, set } from "firebase/database";
import { fireDB } from "../firebase.confiq";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const BlogCard = ({ blog }) => {
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const [allFvrt, setAllFvrt] = useState([]);




  const handleLike = () => {
    // Implement your logic for handling the "Like" button click
    console.log("Liked!");
    setIsLiked(!isLiked); // Toggle like state
  };

  // const handleFavorite = (blog) => {
  //   // Implement your logic for handling the "Favorite" button click
  //   console.log("Favorited!");
  //   set(push(ref(fireDB, "favorites")), {
  //     ...blog,
  //     fvrtID: data.uid,
  //   });
  //   setIsFavorited(!isFavorited); // Toggle favorite state
  //   toast.success("Post Added as Favorite");
  // };

  const handleFavorite = () => {
    if (data && data.uid) {
      // User is logged in
      set(push(ref(fireDB, "favorites")), {
        ...blog,
        
        fvrtID: data.uid,
      });
     
      setIsFavorited(!isFavorited); // Toggle favorite state
      toast.success("Post Added as Favorite");
    } else {
      // User is not logged in
      toast.error("Please log in to add this post to favorites.");
      // Optionally, you can redirect the user to the login page or show a login modal.
    }


  };

  // Create markup function
  function createMarkup(c) {
    return { __html: c };
  }


   useEffect(() => {
    if(data){

    
     const blogRef = ref(fireDB, "favorites");
     onValue(blogRef, (snapshot) => {
       let blogs = [];
       snapshot.forEach((b) => {
        if(data.uid == b.val().fvrtID){

          blogs.push(b.val().id);
        }
       });
       setAllFvrt(blogs);
     });}
   }, []);

   console.log(allFvrt)

  return (
    <div>
      <div className="card lg:card-side bg-stone-950 shadow-stone-700 shadow-lg m-10 rounded-xl">
        <figure className="md:w-2/3 md:h-full m-2">
          <img
            className="w-full h-96 object-cover rounded-md"
            src={blog.thumbnail}
            alt="Album"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold">{blog.title}</h2>
          <div className="flex flex-col sm:flex-row lg:items-center mb-4">
            <img
              src={blog.authorProfile}
              alt={blog.authorName}
              className="w-10 h-10 rounded-full mb-2 sm:mb-0 sm:mr-2"
            />
            <div>
              <p className="text-gray-300 font-semibold uppercase">
                {blog.authorName}
              </p>
              <p className="text-gray-500">{blog.date}</p>
            </div>
          </div>
          <div className="text-gray-300">
            <div
              dangerouslySetInnerHTML={createMarkup(blog.content)}
              className="prose text-white mt-4"
            ></div>
          </div>
          <div className="badge badge-ghost">{blog.category}</div>
          <div>
            {data && (
              <div className="mt-5 mb-5 flex justify-between">
                {allFvrt.includes(blog.id) ? (
                  <button
                    // onClick={handleFavorite}
                    className={`flex items-center bg-red-700 px-4 py-2 rounded-full mr-2 mb-2 sm:mb-0`}
                  >
                    <GiSelfLove />
                  </button>
                ) : (
                  <button
                    onClick={handleFavorite}
                    className={`flex items-center bg-white text-red-700 px-4 py-2 rounded-full mr-2 mb-2 sm:mb-0`}
                  >
                    <GiSelfLove />
                  </button>
                )}
                {
                  <button className="`flex items-center bg-white text-indigo-900 px-4 py-2 rounded-full mr-2 mb-2 sm:mb-0">
                    <AiOutlineComment />
                  </button>
                }
              </div>
            )}
          </div>
          <div className="card-actions justify-end">
            <Link
              to={`/bloginfo/${blog.id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
