import { useState, useEffect } from "react";

import { fireDB } from "../../firebase.confiq";

import {ref, onValue, remove } from "firebase/database";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Nav from "../../components/Nav";

const Profile = () => {
  const [Allblogs, setAllBlogs] = useState([]);
  const user = useSelector((state) => state.userLoginInfo.userInfo);
    const navigate = useNavigate();

   useEffect(() => {
     if (!user) {
       navigate("/");
     }
   });

  useEffect(() => {
    const blogRef = ref(fireDB, "blogs");
    onValue(blogRef, (snapshot) => {
      let blogs = [];
      snapshot.forEach((b) => {
        if (b.val().author === user.uid) {
          blogs.push({ ...b.val(), id: b.key });
        }
      });
      setAllBlogs(blogs);
    });
  }, [user.uid]); // Empty dependency array to fetch blogs only once when the component mounts

  // cancel req
  const handleBlogRemove = (b) => {
    remove(ref(fireDB, "blogs/" + b.id));
  };

  // console.log(Allblogs);

  return (
    <div>
      <Nav/>
      <div>
        <div className="container mx-auto p-8">
          <div className="max-w-md mx-auto bg-indigo-500 text-center rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <img
                src={user.photoURL} // Replace with your profile photo URL
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-white text-center mb-2">
                {user.displayName}
              </h2>
              <Link to='/createblog' className="bg-blue-500 text-white px-4 py-2 rounded-full mx-auto">
                Create Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-4">
        <div className="text-3xl font-semibold mb-4">Blog List</div>

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">S.No</th>
              <th className="border p-2">Thumbnail</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {Allblogs?.map((blog, index) => (
              <tr key={blog.id}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">
                  <img
                    src={blog.thumbnail} // replace 'thumbnail' with the actual property name
                    alt={blog.title} // replace 'title' with the actual property name
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="border p-2">{blog.title}</td>
                <td className="border p-2">{blog.category}</td>
                <td className="border p-2">{blog.date}</td>
                <td className="border p-2">
                  <>
                    <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
                      Edit
                    </button>
                    <button
                      onClick={() => handleBlogRemove(blog)}
                      className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none ml-2"
                    >
                      Remove
                    </button>
                  </>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
