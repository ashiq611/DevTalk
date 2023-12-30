
import  { useEffect, useState } from 'react';
import { fireDB } from '../firebase.confiq';
import { onValue, push, ref, remove, set } from 'firebase/database';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [following, setFollowing] = useState([]);
  const data = useSelector((state) => state.userLoginInfo.userInfo);

  useEffect(() => {
    const blogRef = ref(fireDB, "users");
    onValue(blogRef, (snapshot) => {
      let users = [];
      snapshot.forEach((b) => {
        // if (data?.uid != b.key) {
          users.push({ ...b.val(), id: b.key });
        // }
      });
      setUserList(users);
    });
  }, []);

  useEffect(() => {
    const followRef = ref(fireDB, "follow");
    onValue(followRef, (snapshot) => {
      let users = [];
      snapshot.forEach((f) => {
        // if (data?.uid != f.val().senderID) {
          users.push({ ...f.val(), id: f.key });
        // }
      });
      setFollowing(users);
    });
  }, []);

  // send follow starts
  const handleFollow = (user) => {
    console.log(user);
    if (data) {
      // User is logged in, handle the follow action
      console.log(user);
      set(push(ref(fireDB, "follow")), {
        senderID: data.uid,
        senderName: data.displayName,
        senderProfile: data.photoURL,
        receiverID: user.id,
        receiverName: user.username,
        receiverProfile: user.profile_picture,
      });
    } else {
      // User is not logged in, show an alert
      toast.error('Login First')
    }
  };

  // // cancel req
  // const handleUnfollow = (user) => {
  //   remove(ref(fireDB, "follow/" + user.id));
  // };

  return (
    <div>
      {userList.map((user) => {
        return (
          <div
            key={user.id}
            className="max-w-md mx-auto my-5 bg-indigo-500 text-center rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-4">
              <img
                src={user.profile_picture} // Replace with your profile photo URL
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold text-white text-center mb-2">
                {user.username}
              </h2>
              {following && data ? (
                <button
                  // onClick={() => handleUnfollow(user)}
                  className="bg-blue-500 text-white font-bold px-4 py-2 rounded-full mx-auto"
                >
                  Following
                </button>
              ) : (
                <button
                  onClick={() => handleFollow(user)}
                  className="bg-blue-500 text-white font-bold px-4 py-2 rounded-full mx-auto"
                >
                  Follow
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserList;