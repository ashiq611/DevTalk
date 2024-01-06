import { useState, useRef } from "react";
import { Cropper } from "react-cropper";
import { useDispatch, useSelector } from "react-redux";

import { auth, fireDB, storage } from "../firebase.confiq"; // Fix typo in "config"
import { updateProfile } from "firebase/auth";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { set as dbSet, ref as dbRef } from "firebase/database";
// import { toast } from "react-toastify"; // Make sure to import the toast module

import { userLoginInfo } from "../slices/userSlice"; // Assuming you have an action for updating user info

const ChangeDP = () => {

  const dispatch = useDispatch();
  const data = useSelector((state) => state.userLoginInfo.userInfo);

  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("#");
  const cropperRef = useRef();

  const handleProfileUpload = (e) => {
    e.preventDefault();

    let files;

    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const uploadCancel = () => {
    setImage("");
    setCropData("");
  };

  const getCropData = async () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      setCropData(cropperRef.current.cropper.getCroppedCanvas().toDataURL());

      const storageRef = ref(storage, auth.currentUser.uid);

      try {
        const message4 = cropperRef.current.cropper
          .getCroppedCanvas()
          .toDataURL();
        const snapshot = await uploadString(storageRef, message4, "data_url");
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

        setImage("");
        setCropData("");
      } catch (error) {
        console.error("Error uploading profile picture:", error.message);
        // Handle the error (e.g., show a toast with an error message)
      }
    }
  };

  return (
    <div>
      <dialog id="my_modal_11" className="modal">
        <div className="modal-box bg-white">
            
          <h3 className="font-bold text-lg">Upload Your Profile Picture</h3>
          <div className="m-4">
            <input
              type="file"
              className="file-input file-input-bordered file-input-warning w-full max-w-xs"
              onChange={handleProfileUpload}
            />
          </div>
          <div>
            {!image && image == "<empty string>" ? (
              <div>
                <img
                  src={data?.photoURL}
                  alt={data?.displayName}
                  className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden mx-auto my-5"
                />
              </div>
            ) : (
              <div className="img-preview w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden  mx-auto my-5" />
            )}
          </div>
          {image && (
            // <Cropper
            //   style={{ height: 400, width: "100%" }}
            //   initialAspectRatio={1}
            //   preview=".img-preview"
            //   src={image}
            //   ref={cropperRef}
            //   viewMode={1}
            //   guides={true}
            //   minCropBoxHeight={10}
            //   minCropBoxWidth={10}
            //   background={false}
            //   responsive={true}
            //   checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            // />
            <Cropper
              src={image}
              style={{ height: 400, width: "100%" }}
              // Cropper.js options
              initialAspectRatio={16 / 9}
              guides={false}
              crop={cropData}
              ref={cropperRef}
              responsive={true}
            />
          )}
          <div className="modal-action">
            {image && (
              <button onClick={getCropData} className="btn btn-warning">
                Upload
              </button>
            )}
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button onClick={uploadCancel} className="btn btn-error">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ChangeDP;
