
import  { useEffect, useState } from 'react';
import { fireDB } from '../firebase.confiq';
import { onValue, ref } from 'firebase/database';

const UserList = () => {
    const [userList, setUserList] = useState([])

     useEffect(() => {
       const blogRef = ref(fireDB, "users");
       onValue(blogRef, (snapshot) => {
         let users = [];
         snapshot.forEach((b) => {
           users.push({ ...b.val(), id: b.key });
         });
         setUserList(users);
       });
     }, []);

    return (
        <div>
            {
                userList.map((user) => {
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
                          <button
                            to="/createblog"
                            className="bg-blue-500 text-white font-bold px-4 py-2 rounded-full mx-auto"
                          >
                            Follow
                          </button>
                        </div>
                      </div>
                    );
                })
            }
        </div>
    );
};

export default UserList;