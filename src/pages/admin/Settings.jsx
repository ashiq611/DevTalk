import {  onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdOutlineMenuOpen } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { fireDB } from "../../firebase.confiq";
import Nav from "../../components/Nav";

const Settings = () => {
  const navigate = useNavigate();

  const [devices, setDevices] = useState([]);

  const data = useSelector((state) => state.userLoginInfo.userInfo);

  useEffect(() => {
    const deviceRef = ref(fireDB, "devices");
    onValue(deviceRef, (snapshot) => {
      let device = [];
      snapshot.forEach((req) => {
        if (req.val().userID === data?.uid) {
          device.push({ ...req.val(), id: req.key });
        }
      });
      setDevices(device);
    });
  }, [setDevices, data?.uid]);

  // private page
  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  });

  return (
    <>
      <Nav />
      <div className="container mx-auto">
       
        <div>
          <div className="grid h-20 card bg-base-300 font-semibold text-2xl text-red-600 rounded-box place-items-center">
            Logged In History
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>Device Name</th>
                <th>Os</th>
                <th>Date/Time</th>
                <th>Logged In</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {devices?.map((d) => (
                <tr key={d.id}>
                  <td>{d.deviceName}</td>
                  <td>{d.os}</td>
                  <td>
                    {d.loggedInDate &&
                      new Date(d.loggedInDate).toLocaleString()}
                  </td>
                  <td>
                    {d.loggedIn ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Settings;
