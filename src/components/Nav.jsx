import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLoginInfo } from "../slices/userSlice";
import SearchDialog from "./SearchDialog";



const Nav = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const data = useSelector((state) => state.userLoginInfo.userInfo);

    const logOutHandle = () => {
      localStorage.removeItem("user");
      dispatch(userLoginInfo(null));

      navigate("/login");
      // toast.warn("Logged out Successfully");
    };

  return (
    <div>
      <div className="navbar h-full bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/about">About</Link>
              </li>

              <li>{data && <Link to="/favourite">Favourite</Link>}</li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            DevTalk
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/about">About</Link>
            </li>

            <li>{data && <Link to="/favourite">Favourite</Link>}</li>
          </ul>
        </div>

        <div className="navbar-end">
          <button
            onClick={() => document.getElementById("my_modal_77").showModal()}
            className="btn btn-ghost btn-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <SearchDialog/>

          {!data && (
            <Link to="/login" className="btn">
              Login
            </Link>
          )}
        </div>
        {data && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={data?.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
              <li>
                <button onClick={logOutHandle}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;