import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { fireDB, storage } from "../../firebase.confiq";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { ref as dbref, set, push } from "firebase/database";

const CreateBlog = () => {
  const [blogs, setBlogs] = useState({
    title: "",
    category: "",
    content: "",
    // time: Timestamp.now(),
  });

  const [thumbnail, setThumbnail] = useState();
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.userLoginInfo.userInfo);
  console.log(blogs);

  //* Add Post Function
  const addPost = async () => {
    if (
      blogs.title === "" ||
      blogs.category === "" ||
      blogs.content === "" ||
      blogs.thumbnail === ""
    ) {
      toast.error("Please Fill All Fields");
    }
    // console.log(blogs.content)
    uploadImage();
  };

  // Upload Image Function
  const uploadImage = () => {
    const storageRef = ref(storage, `blogimage/${thumbnail.name}`);

    uploadBytes(storageRef, thumbnail).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        try {
          const newBlogEntry = {
            title: blogs.title,
            category: blogs.category,
            content: blogs.content,
            author: user.uid,
            thumbnail: url,
            date: new Date().toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }),
          };

          // Assuming "blogs" is the root node in your Realtime Database
          const blogsRef = dbref(fireDB, "blogs");

          // Use push to generate a unique key for the new entry
          const newEntryRef = push(blogsRef);

          // Use set to add the data under the generated key
          set(newEntryRef, newBlogEntry);

          navigate("/profile");
          toast.success("Post Added Successfully");
        } catch (error) {
          toast.error(error.message);
          console.error(error);
        }
      });
    });
  };

 
  // Create markup function
  function createMarkup(c) {
    return { __html: c };
  }

  return (
    <div className="container mx-auto max-w-5xl p-4">
      {/* Main Content */}
      <div className="mb-4">
        {/* Thumbnail */}
        {thumbnail && (
          <img
            className="w-full rounded-md mb-3"
            src={thumbnail ? URL.createObjectURL(thumbnail) : ""}
            alt="thumbnail"
          />
        )}
        <div>
          <input
            onChange={(e) => setThumbnail(e.target.files[0])}
            type="file"
            className="file-input file-input-bordered file-input-warning w-full max-w-xs"
          />
        </div>

        <input
          type="text"
          placeholder="Title"
          className="input input-bordered input-accent w-full max-w-xs mb-2"
          value={blogs.title}
          onChange={(e) => setBlogs({ ...blogs, title: e.target.value })}
        />

        <input
          type="text"
          placeholder="Category"
          className="input input-bordered input-accent w-full max-w-xs mb-2"
          value={blogs.category}
          onChange={(e) => setBlogs({ ...blogs, category: e.target.value })}
        />

        <Editor
          apiKey="jtgj35incgax88hnujwssjevhvfy5kisj7vowfjwhsc34xth"
          onEditorChange={(newValue, editor) => {
            setBlogs({ ...blogs, content: newValue });
            setText(editor.getContent({ format: "text" }));
          }}
          onInit={(evt, editor) => {
            setText(editor.getContent({ format: "text" }));
          }}
          init={{
            plugins:
              "a11ychecker advcode advlist advtable anchor autocorrect autolink autoresize autosave casechange charmap checklist code codesample directionality editimage emoticons export footnotes formatpainter fullscreen help image importcss inlinecss insertdatetime link linkchecker lists media mediaembed mentions mergetags nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table tableofcontents template tinydrive tinymcespellchecker typography visualblocks visualchars wordcount",
          }}
        />
        <button onClick={addPost} className="btn mt-4">
          Send
        </button>
        <h1 className=" text-center mb-3 text-2xl">Preview</h1>
        <div
          dangerouslySetInnerHTML={createMarkup(blogs.content)}
          className="mt-4 [&> h1]:text-[32px] [&>h1]:font-bold [&>h1]:mb-2.5 [&> h2]:text-[24px] [&>h2]:font-bold [&>h2]:mb-2.5"
        ></div>
      </div>
    </div>
  );
};

export default CreateBlog;
