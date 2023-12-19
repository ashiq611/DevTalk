import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fireDB } from "../firebase.confiq";
import { onValue, push, ref, set } from "firebase/database";


const BlogInfo = () => {
    const id = useParams();
    const [AllBlogs, setAllBlogs] = useState([]);
    const [AllComment, setAllComment] = useState([]);
    const [name, setName] = useState('')
    const [comment, setComment] = useState('')

     useEffect(() => {
       const blogRef = ref(fireDB, "blogs/" + id.id);
       onValue(blogRef, (snapshot) => {
         let blogs = [];
        
         blogs.push(snapshot.val());
         
         setAllBlogs(blogs);
       });
     }, [id.id]);
    

    const handleComment = (b) => {
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

//  console.log(AllComment);
     useEffect(() => {
       const commentRef = ref(fireDB, "comment/");
       onValue(commentRef, (snapshot) => {
         let comments = [];

         snapshot.forEach((c) => {
           if (id.id !== c.id) {
             comments.push({
               ...c.val(),
               id: c.key,
             });
           }

           setAllComment(comments);
         });
       });
     }, [id.id]);


    return (
      <div>
        {AllBlogs.map((b, index) => (
          <div key={index} className="card w-96 bg-base-100 shadow-xl">
            <figure>
              <img src={b.thumbnail} alt="Shoes" />
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
            <div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered input-info w-full max-w-xs"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <textarea
                className="textarea textarea-info"
                placeholder="Bio"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              ></textarea>
              <button onClick={() => handleComment(b)}>comment</button>
            </div>
          </div>
        ))}
        <div>{AllComment.map((c) => (
          <div key={c.id}>
            <h2>{c.name}</h2>
            <p>{c.comment}</p>
          </div>
        )
        )}</div>
      </div>
    );
};

export default BlogInfo;
