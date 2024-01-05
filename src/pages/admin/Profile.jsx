// Import statements...
import { useState, useEffect } from "react";
import { ref, onValue, remove } from "firebase/database";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Nav from "../../components/Nav";
import { fireDB } from "../../firebase.confiq";

const Profile = () => {
  const [Allblogs, setAllBlogs] = useState([]);
  const [following, setFollowing] = useState([]);
  const [follower, setFollower] = useState([]);
  const user = useSelector((state) => state.userLoginInfo.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

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
  }, [user.uid]);

  useEffect(() => {
    const followRef = ref(fireDB, "follow");
    onValue(followRef, (snapshot) => {
      let follows = [];
      snapshot.forEach((f) => {
        if (f.val().senderID === user.uid) {
          follows.push({ ...f.val(), id: f.key });
        }
      });
      setFollowing(follows);
    });
  }, [user.uid]);

  useEffect(() => {
    const followRef = ref(fireDB, "follow");
    onValue(followRef, (snapshot) => {
      let follows = [];
      snapshot.forEach((f) => {
        if (f.val().receiverID === user.uid) {
          follows.push({ ...f.val(), id: f.key });
        }
      });
      setFollower(follows);
    });
  }, [user.uid]);

  const handleBlogRemove = (b) => {
    remove(ref(fireDB, `blogs/${b.id}`));
  };

  // unfollow starts
  const handleUnfollow = (f) => {
    console.log("hello");
    if (user) {
      // User is logged in, handle the unfollow action
      const followToRemove = following.find(
        (follow) => follow.id === f.id
      );
console.log(followToRemove);
      if (followToRemove) {
        // Remove the follow entry from the "follow" node
        remove(ref(fireDB, `follow/${followToRemove.id}`));
      }
    }
  };

  console.log(following);

  return (
    <div className="min-h-screen bg-black">
      <Nav />
      <div className="container mx-auto p-4 sm:p-8">
        <div className="max-w-md mx-auto bg-slate-900 text-center rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-white mb-2">
              {user.displayName}
            </h2>
            <Link
              to="/createblog"
              className="bg-indigo-600 btn text-white  rounded-full "
            >
              Create Blog
            </Link>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
              <button
                className="btn btn-xs sm:btn-sm md:btn-md rounded-lg"
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
              >
                Following
              </button>
              <button
                className="btn btn-xs sm:btn-sm md:btn-md rounded-lg"
                onClick={() =>
                  document.getElementById("my_modal_6").showModal()
                }
              >
                Followers
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Following Modal */}
      <div className="following">
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <div>
              {following.map((f) => (
                <div
                  key={f.id}
                  className="max-w-md mx-auto bg-indigo-500 text-center rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-4">
                    <img
                      src={f.receiverProfile}
                      alt="Profile"
                      className="w-24 h-24 rounded-full mx-auto mb-4"
                    />
                    <h2 className="text-xl font-semibold text-white text-center mb-2">
                      {f.receiverName}
                    </h2>
                    <div>
                      <button onClick={() => handleUnfollow(f)}>
                        Unfollow
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      {/* Followers Modal */}
      <div className="follower">
        <dialog id="my_modal_6" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <div>
              {follower.map((f) => (
                <div
                  key={f.id}
                  className="max-w-md mx-auto bg-indigo-500 text-center rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-4">
                    <img
                      src={f.senderProfile}
                      alt="Profile"
                      className="w-24 h-24 rounded-full mx-auto mb-4"
                    />
                    <h2 className="text-xl font-semibold text-white text-center mb-2">
                      {f.senderName}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      <div className="w-full p-4">
        <div className="text-3xl font-semibold mb-4">Blog List</div>

        <div className="overflow-x-auto">
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
                      src={blog.thumbnail}
                      alt={blog.title}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="border p-2">{blog.title}</td>
                  <td className="border p-2">{blog.category}</td>
                  <td className="border p-2">{blog.date}</td>
                  <td className="border p-2">
                    <>
                      {/* <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
                        Edit
                      </button> */}
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
    </div>
  );
};

export default Profile;
