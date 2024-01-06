import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiSelfLove } from "react-icons/gi";
import { AiOutlineComment } from "react-icons/ai";
import { FaHashtag } from "react-icons/fa";
import { onValue, push, ref, remove, set } from "firebase/database";
import { fireDB } from "../firebase.confiq";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const BlogCard = ({ blog }) => {
  const data = useSelector((state) => state.userLoginInfo.userInfo);

  const [isFavorited, setIsFavorited] = useState(false);

  const [allFvrt, setAllFvrt] = useState([]);

 

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

  // const handleFavorite = (blog) => {
  //   if (data && data.uid) {
  //     // User is logged in
  //     set(push(ref(fireDB, "favorites")), {
  //       ...blog,

  //       fvrtID: data.uid,
  //     });

      

  //     setIsFavorited(!isFavorited); // Toggle favorite state
  //     toast.success("Post Added as Favorite");
  //   } else {
  //     // User is not logged in
  //     toast.error("Please log in to add this post to favorites.");
  //     // Optionally, you can redirect the user to the login page or show a login modal.
  //   }
  // };

  const handleFavorite = (blog) => {
    if (data && data.uid) {
      // User is logged in
      set(push(ref(fireDB, "favorites")), {
        ...blog,
        fvrtID: data.uid,
      });

      // Update the state to include the new favorite
      setAllFvrt((prevFvrt) => [...prevFvrt, blog.id]);

      setIsFavorited(!isFavorited); // Toggle favorite state
      toast.success("Post Added as Favorite");
    } else {
      // User is not logged in
      toast.error("Please log in to add this post to favorites.");
    }
  };

  // Create markup function
  function createMarkup(c) {
    return { __html: c };
  }

  useEffect(() => {
    if (data) {
      const blogRef = ref(fireDB, "favorites");
      onValue(blogRef, (snapshot) => {
        let blogs = [];
        snapshot.forEach((b) => {
          if (data.uid == b.val().fvrtID) {
            blogs.push(b.val().id);
          }
        });
        setAllFvrt(blogs);
      });
    }
  }, []);

  function getFirstWords(content, numWords) {
    const words = content.split(" ");
    const slicedWords = words.slice(0, numWords);
    return slicedWords.join(" ");
  }

  // const handleRemoveFavorite = (blog) => {
  //   if (data && data.uid) {
  //     const favoriteRef = ref(fireDB, "favorites");
  //     onValue(favoriteRef, (snapshot) => {
  //       snapshot.forEach((favoriteSnapshot) => {
  //         const favorite = favoriteSnapshot.val();
  //         if (favorite.fvrtID === data.uid && favorite.id === blog.id) {
  //           const favoriteToRemoveRef = ref(
  //             fireDB,
  //             `favorites/${favoriteSnapshot.key}`
  //           );
  //           remove(favoriteToRemoveRef);
  //           setIsFavorited(false); // Set favorite state to false
  //           toast.success("Post Removed from Favorites");
  //         }
  //       });
  //     });
  //   }
  // };

const handleRemoveFavorite = (blog) => {
  if (data && data.uid) {
    const favoriteRef = ref(fireDB, "favorites");
    onValue(favoriteRef, (snapshot) => {
      snapshot.forEach((favoriteSnapshot) => {
        const favorite = favoriteSnapshot.val();
        if (favorite.fvrtID === data.uid && favorite.id === blog.id) {
          const favoriteToRemoveRef = ref(
            fireDB,
            `favorites/${favoriteSnapshot.key}`
          );

          // Remove the favorite
          remove(favoriteToRemoveRef)
            .then(() => {
              toast.success("Post Removed from Favorites");

              // Update the state to exclude the removed favorite
              setAllFvrt((prevFvrt) => prevFvrt.filter((id) => id !== blog.id));

              setIsFavorited(false); // Set favorite state to false
            })
            .catch((error) => {
              console.error("Error removing favorite:", error.message);
              toast.error("Failed to remove post from Favorites");
            });
        }
      });
    });
  }
};



  console.log(allFvrt);

  return (
    <div>
      <div className="card lg:card-side bg-stone-950 shadow-stone-700 shadow-lg my-10 rounded-xl">
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
          <div className="text-gray-300 flex gap-2 items-end">
            <div
              dangerouslySetInnerHTML={createMarkup(
                getFirstWords(blog.content, 5)
              )}
              className="prose text-white mt-4"
            ></div>
            <span className="font-bold">...</span>
          </div>
          
           
            <div className="badge badge-outline rounded-lg">
              <FaHashtag />
              {blog.category}
            </div>
         
          <div>
            {data && (
              <div className="mt-5 mb-5 flex justify-between">
                {allFvrt.includes(blog.id) ? (
                  <button
                    onClick={() => handleRemoveFavorite(blog)}
                    className={`flex items-center bg-red-700 hover:scale-110 transition-all   px-4 py-2 rounded-full mr-2 mb-2 sm:mb-0`}
                  >
                    <GiSelfLove />
                  </button>
                ) : (
                  <button
                    onClick={() => handleFavorite(blog)}
                    className={`flex items-center bg-white text-red-700 hover:bg-slate-400 transition-all  hover:scale-110 px-4 py-2 rounded-full mr-2 mb-2 sm:mb-0`}
                  >
                    <GiSelfLove />
                  </button>
                )}
                {
                  <Link
                    to={`/bloginfo/${blog.id}`}
                    className="`flex items-center bg-white text-indigo-900 hover:bg-slate-400 hover:scale-110 transition-all  px-4 py-2 rounded-full mr-2 mb-2 sm:mb-0"
                  >
                    <AiOutlineComment />
                  </Link>
                }
              </div>
            )}
          </div>
          <div className="card-actions justify-end">
            <Link
              to={`/bloginfo/${blog.id}`}
              className="bg-blue-500 btn text-white px-4 py-2 rounded-md"
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
