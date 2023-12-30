import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fireDB } from "../firebase.confiq";
import { onValue, push, ref, set } from "firebase/database";


import Nav from "../components/Nav";
import { FcLike } from "react-icons/fc";
import { BiLike } from "react-icons/bi";


const BlogInfo = () => {
    const id = useParams();
    const [AllBlogs, setAllBlogs] = useState({});
    const [AllComment, setAllComment] = useState([]);
    const [name, setName] = useState('')
    const [comment, setComment] = useState('')

     useEffect(() => {
       const blogRef = ref(fireDB, "blogs/" + id.id);
       onValue(blogRef, (snapshot) => {
         let blogs ;
        
         blogs = snapshot.val();
         
         setAllBlogs(blogs);
       });
     }, [id.id]);
    
// console.log(AllBlogs);
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
      setName('')
      setComment('')
    };

 console.log(AllComment);
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

     function createMarkup(c) {
       return { __html: c };
     }


    return (
      <>
        <Nav />
        <div className="w-3/4 mx-auto bg-gray-800 text-white rounded-md overflow-hidden shadow-lg p-4">
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
                <div className="badge badge-primary uppercase">{AllBlogs.category}</div>
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
              <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
                <div className="flex mb-2 sm:mb-0">
                  <button
                    // onClick={handleLike}
                    className="flex items-center bg-white text-blue-700 px-4 py-2 rounded-full mr-2 mb-2 sm:mb-0"
                  >
                    <BiLike />
                  </button>
                  <button
                    // onClick={handleFavorite}
                    className="flex items-center bg-stone-50 text-white px-4 py-2 rounded-full mr-2 mb-2 sm:mb-0"
                  >
                    <FcLike />
                  </button>
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

            {/* Add more comments as needed */}
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
            {/* Add more input fields for comment content, etc. */}
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
