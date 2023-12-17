import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fireDB } from "../firebase.confiq";
import { onValue, ref } from "firebase/database";


const BlogInfo = () => {
    const id = useParams();
    const [AllBlogs, setAllBlogs] = useState([]);

     useEffect(() => {
       const blogRef = ref(fireDB, "blogs/" + id.id);
       onValue(blogRef, (snapshot) => {
         let blogs = [];
        
         blogs.push(snapshot.val());
         
         setAllBlogs(blogs);
       });
     }, [id.id]);
     console.log(AllBlogs);


    return (
      <div>
        {AllBlogs.map((b, index) => (
          <div key={index} className="card w-96 bg-base-100 shadow-xl">
            <figure>
              <img
                src={b.thumbnail}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {b.title}
                <div className="badge badge-secondary">NEW</div>
              </h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <div className="badge badge-outline">Fashion</div>
                <div className="badge badge-outline">Products</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
};

export default BlogInfo;
