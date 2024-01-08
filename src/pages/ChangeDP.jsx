import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, fireDB, storage } from "../firebase.confiq";
import { updateProfile } from "firebase/auth";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { set as dbSet, ref as dbRef } from "firebase/database";
// import { toast } from "react-toastify"; // Make sure to import the toast module

import { userLoginInfo } from "../slices/userSlice"; // Assuming you have an action for updating user info

const ChangeDP = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.userLoginInfo.userInfo);

  const [image, setImage] = useState(null);

  const handleProfileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadProfilePicture = async () => {
    if (image) {
      const storageRef = ref(storage, auth.currentUser.uid);

      try {
        const snapshot = await uploadString(storageRef, image, "data_url");
        const downloadURL = await getDownloadURL(storageRef);

        updateProfile(auth.currentUser, {
          photoURL: downloadURL,
        });

        const databaseRef = dbRef(fireDB, `/users/${auth.currentUser.uid}/`);
        await dbSet(databaseRef, {
          email: auth.currentUser.email,
          profile_picture: downloadURL,
          username: auth.currentUser.displayName,
        });

        dispatch(
          userLoginInfo({
            ...data,
            photoURL: downloadURL,
          })
        );

        localStorage.setItem("user", JSON.stringify(auth.currentUser));
        // toast.success("Your Profile Picture is uploaded Successfully");

        setImage(null);
      } catch (error) {
        console.error("Error uploading profile picture:", error.message);
        // Handle the error (e.g., show a toast with an error message)
      }
    }
  };

  return (
    <div>
      <dialog id="my_modal_11" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Upload Your Profile Picture</h3>
          <div className="m-4">
            <input
              type="file"
              className="file-input file-input-bordered file-input-warning w-full max-w-xs"
              onChange={handleProfileUpload}
            />
          </div>
          <div>
            {image && (
              <img
                src={image}
                alt="Profile Preview"
                className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden mx-auto my-5"
              />
            )}
          </div>
          <div className="modal-action">
            {image && (
              <button
                onClick={uploadProfilePicture}
                className="btn btn-warning"
              >
                Upload
              </button>
            )}
            <form method="dialog">
              <button className="btn btn-error">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ChangeDP;
