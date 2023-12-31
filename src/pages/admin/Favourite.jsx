import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { fireDB } from "../../firebase.confiq";
import { useSelector } from "react-redux";
import BlogCard from "../../components/BlogCard";
import Nav from "../../components/Nav";

const Favourite = () => {
  const data = useSelector((state) => state.userLoginInfo.userInfo);
  const [fvrt, setFvrt] = useState([]);

  useEffect(() => {
    // const userRef = ref(fireDB, "favorites");

    // onValue(userRef, (snapshot) => {
    //   let list = [];

    //   // Iterate through each child node in the snapshot
    //   snapshot.forEach((blog) => {
    //     const blogData = blog.val(); // Access the data using val()

    //     // Check if the logged-in user's UID matches the fvrtID in the database
    //     if (data && data.uid == blogData.fvrtID) {
    //       list.push({
    //         ...blogData,
    //         key: blog.key,
    //       });
    //     }
    //   });

    //   // Update the state with the new list
    //   setFvrt(list);
    // });

    const userRef = ref(fireDB, "favorites");

    onValue(userRef, (snapshot) => {
      let list = [];

      // Iterate through each child node in the snapshot
      snapshot.forEach((blog) => {
        // Check if the logged-in user's UID matches the fvrtID in the database
        const blogData = blog.val(); // If needed, access the data using val()
        if (data && data.uid == blogData.fvrtID) {
          list.push({
            ...blogData,
            key: blog.key,
          });
        }
      });

      // Update the state with the new list
      setFvrt(list);
    });
  }, [data]);

  console.log(fvrt);

  return (
    <>
    <Nav/>
    <div className=" min-h-screen container mx-auto py-5 lg:py-10 m-5">
      {fvrt?.map((blog) => (
          <BlogCard key={blog.key} blog={blog} />
          ))}
    </div>
          </>
  );
};

export default Favourite;
