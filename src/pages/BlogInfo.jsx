import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fireDB } from "../firebase.confiq";
import { onValue, push, ref, remove, set } from "firebase/database";
import Nav from "../components/Nav";
import { GiSelfLove } from "react-icons/gi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaHashtag } from "react-icons/fa";

import ShareModal from "../components/ShareModal";
import { MdOutlineShare } from "react-icons/md";

const BlogInfo = () => {
  const id = useParams();
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [AllBlogs, setAllBlogs] = useState({});
  const [AllComment, setAllComment] = useState([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [isFavorited, setIsFavorited] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
  const [allFvrt, setAllFvrt] = useState([]);

  useEffect(() => {
    const blogRef = ref(fireDB, "blogs/" + id.id);
    onValue(blogRef, (snapshot) => {
      let blogs;
      blogs = snapshot.val();
      setAllBlogs({...blogs, id: snapshot.key});
    });
  }, [id.id]);

  const handleComment = () => {
    set(push(ref(fireDB, "comment")), {
      name: name,
      comment: comment,
      authorID: id.id,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    });
    setName("");
    setComment("");
  };

  useEffect(() => {
    const commentRef = ref(fireDB, "comment");
    onValue(commentRef, (snapshot) => {
      let comments = [];

      snapshot.forEach((c) => {
        if (id.id == c.val().authorID) {
          comments.push({
            ...c.val(),
            id: c.key,
          });
        }

        setAllComment(comments);
      });
    });
  }, [id.id]);



  const handleFavorite = () => {
    if (data && data.uid) {
      // User is logged in
      set(push(ref(fireDB, "favorites")), {
        ...AllBlogs,
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



  const handleRemoveFavorite = (AllBlogs) => {
    if (data && data.uid) {
      const favoriteRef = ref(fireDB, "favorites");
      onValue(favoriteRef, (snapshot) => {
        snapshot.forEach((favoriteSnapshot) => {
          const favorite = favoriteSnapshot.val();
          if (favorite.fvrtID === data.uid && favorite.id === AllBlogs.id) {
            const favoriteToRemoveRef = ref(
              fireDB,
              `favorites/${favoriteSnapshot.key}`
            );

            // Remove the favorite
            remove(favoriteToRemoveRef)
              .then(() => {
                toast.success("Post Removed from Favorites");

                // Update the state to exclude the removed favorite
                setAllFvrt((prevFvrt) =>
                  prevFvrt.filter((id) => id !== blog.id)
                );

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



  const currentURL = window.location.href;
  const blogURL = `${currentURL}`;

  return (
    <>
      <Nav />
      <div className="lg:w-3/4 w-full mx-auto bg-stone-950 text-white shadow-stone-700 shadow-lg rounded-md overflow-hidden p-4">
        {/* Blog Content */}
        <div>
          {/* Image with shadow */}
          <div className="relative">
            <img
              className="w-full h-48 lg:h-96 object-cover object-center rounded-md shadow"
              src={AllBlogs.thumbnail}
              alt="Blog Post"
            />
          </div>

          <div className="p-4">
            {/* Category */}
            <div className="flex flex-wrap mt-4">
              <div className="badge badge-outline rounded-lg">
                <FaHashtag />
                {AllBlogs.category}
              </div>
            </div>

            {/* Title */}
            <h2 className="mt-2 text-xl font-semibold">{AllBlogs.title}</h2>

            <div className="flex items-center mt-4">
              {/* Author Photo */}
              <img
                className="w-8 h-8 rounded-full mr-2"
                src={AllBlogs.authorProfile}
                alt="Author"
              />

              {/* Author Name and Date */}
              <div>
                <p className="text-sm font-medium">{AllBlogs.authorName}</p>
                <p className="text-sm">{AllBlogs.date}</p>
              </div>
            </div>

            {/* Content Box */}
            <div
              dangerouslySetInnerHTML={createMarkup(AllBlogs.content)}
              className="prose text-white mt-4"
            ></div>

            {/* Favorite Button */}
            <div className="flex flex-col sm:flex-row justify-between  mt-4">
              <div className="flex mb-2 sm:mb-0">
                {data && (
                  <div className="mt-5">
                    {allFvrt.includes(AllBlogs.id) ? (
                      <button
                        onClick={() => handleRemoveFavorite(AllBlogs)}
                        className={`flex items-center bg-red-700   transition-all  hover:scale-110  px-4 py-2 rounded-full mr-2 mb-2 sm:mb-0`}
                      >
                        <GiSelfLove />
                      </button>
                    ) : (
                      <button
                        onClick={handleFavorite}
                        className={`flex items-center bg-white text-red-700  hover:bg-slate-400 transition-all  hover:scale-110 px-4 py-2 rounded-full mr-2 mb-2 sm:mb-0`}
                      >
                        <GiSelfLove />
                      </button>
                    )}
                  </div>
                )}
                <button
                  onClick={() =>
                    document.getElementById("my_modal_5").showModal()
                  }
                  className="flex items-center bg-sky-700   transition-all  hover:scale-110  px-4 py-2 rounded-full mr-2 mb-2 mt-5 sm:mb-0"
                >
                  <MdOutlineShare />
                </button>
                <ShareModal url={blogURL} />
              </div>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Comments</h3>
          {AllComment.map((c) => (
            <div key={c.id}>
              <div className="flex items-center mb-2">
                <p className="text-sm font-medium uppercase">
                  {c.name} - {c.date}
                </p>
              </div>
              <p className="mb-4">{c.comment}</p>
            </div>
          ))}
        </div>

        {/* Comment Box */}
        <div className="mt-4 p-4 bg-gray-700 rounded-md">
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500 bg-gray-800 text-white"
            placeholder="Your Full Name"
          />
          <label className="form-control">
            <div className="label">
              <span className="label-text">Your Comment</span>
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="textarea textarea-bordered h-24"
              placeholder="Bio"
            ></textarea>
            <div className="label">
              <span className="label-text-alt">Your bio</span>
            </div>
          </label>
          <button
            onClick={handleComment}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Post Comment
          </button>
        </div>
      </div>
    </>
  );
};

export default BlogInfo;
