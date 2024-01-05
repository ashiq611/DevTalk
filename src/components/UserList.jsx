
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
        if (!data) {
          users.push({ ...b.val(), id: b.key });
        } else {
          if (data?.uid != b.key) {
            users.push({ ...b.val(), id: b.key });
          }
        }
        // if (data?.uid != b.key) {
        // }
      });
      setUserList(users);
    });
  }, [data]);

  useEffect(() => {
    const followRef = ref(fireDB, "follow");
    onValue(followRef, (snapshot) => {
      let users = [];

      snapshot.forEach((f) => {
        if (data && data.uid == f.val().senderID) {
          users.push({...f.val(), id: f.key}); // Push the entire follow object
        }
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
      toast.error("Login First");
    }
  };

  // unfollow starts
  const handleUnfollow = (user) => {
    console.log('hello')
    if (data) {
      // User is logged in, handle the unfollow action
      const followToRemove = following.find(
        (follow) => follow.receiverID === user.id
      );

      if (followToRemove) {
        // Remove the follow entry from the "follow" node
        remove(ref(fireDB, `follow/${followToRemove.id}`));
      }
    }
  };

  // // cancel req
  // const handleUnfollow = (user) => {
  //   remove(ref(fireDB, "follow/" + user.id));
  // };
  console.log(following);
  return (
    <div>
      {userList.map((user) => {
        return (
          <div
            key={user.id}
            className="max-w-md mx-auto my-5 bg-blue-950 text-center rounded-lg shadow-lg shadow-blue-900 overflow-hidden"
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
              {data &&
              following.some((follow) => follow.receiverID === user.id) ? (
                <button
                  onClick={() => handleUnfollow(user)}
                  className="btn btn-xs sm:btn-sm md:btn-md rounded-lg bg-indigo-500"
                >
                  Following
                </button>
              ) : (
                <button
                  onClick={() => handleFollow(user)}
                  className="btn btn-xs sm:btn-sm md:btn-md rounded-lg bg-sky-800"
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