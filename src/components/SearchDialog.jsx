import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { fireDB } from "../firebase.confiq";
import { Link } from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";

const SearchDialog = () => {
  const [AllBlogs, setAllBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
   const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    const blogRef = ref(fireDB, "blogs");
    onValue(blogRef, (snapshot) => {
      let blogs = [];
      snapshot.forEach((b) => {
        blogs.push({ ...b.val(), id: b.key });
      });
      setAllBlogs(blogs);
 
    });
  }, []);

  const handleSearch = () => {
    setSearch("");
    const searchInput = search.toLowerCase();
    const filtered = AllBlogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchInput) ||
        blog.category.toLowerCase().includes(searchInput)
    );
    setFilter(filtered);
    setSearchPerformed(true); // Set the flag after search is performed
  };

  const handleClose = () => {
    setFilter([]);
    setSearchPerformed(false); // Reset the flag when closing
  };
  //   console.log(filter)

  return (
    <div>
      <dialog id="my_modal_77" className="modal modal-top sm:modal-middle">
        <div className="modal-box">
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={handleClose}
                className="btn btn-error btn-xs text-white rounded-lg text-xl"
              >
                <ImCancelCircle />
              </button>
            </form>
          </div>
          <h3 className="font-bold text-lg">Search</h3>
          <div className="py-4 flex gap-5">
            <input
              type="text"
              value={search}
              placeholder="Type here"
              className="input input-bordered rounded-lg w-full max-w-xs"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className="btn btn-success rounded-lg"
            >
              Search
            </button>
          </div>

          <div>
            {searchPerformed && filter.length === 0 ? (
              <p>No blogs found.</p>
            ) : (
              filter.map((blog) => (
                <div
                  key={blog.id}
                  className="card w-60 bg-base-100 shadow-xl image-full m-5"
                >
                  <figure>
                    <img src={blog.thumbnail} alt="Shoes" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{blog.title}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
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
              ))
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default SearchDialog;
