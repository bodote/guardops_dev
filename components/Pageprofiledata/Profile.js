import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
const Profile = () => {
  const { user, error, isLoading } = useUser();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    contact: "",
  });

  const handleOnChange = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (user) {
      console.log("test++++", user);
      setUserInfo({
        name: user.name || "",
        email: user.email || "",
        contact: "",
      });
    }
  }, [user]);
  return (
    <>
      {isLoading && !user && <div> </div>}
      {user && (
        <div className="sm:w-[360px] w-auto">
          <div className="">
            <label
              htmlFor="name"
              className="text-[#252525] font-medium text-[14px] font-Inter"
            >
              Name
            </label>
            <input
              className="h-10  border border-[#EAEBF0] my-[6px] rounded  w-full focus:ring-0 focus:outline-none focus:!border-[#EAEBF0]  font-normal text-[15px] font-Inter"
              type="text"
              name="name"
              placeholder="User 1"
              onChange={handleOnChange}
              value={userInfo.name}
            />
            <p className="text-[#68727D] font-normal text-[14px] font-Inter">
              The name associated with this account
            </p>
          </div>
          <div className=" my-[28px]">
            <label
              htmlFor="email"
              className="text-[#252525] font-medium text-[14px] font-Inter"
            >
              Email address
            </label>
            <input
              className="h-10  border border-[#EAEBF0] my-[6px] rounded  w-full focus:ring-0 focus:outline-none focus:!border-[#EAEBF0] font-normal text-[15px] font-Inter placeholder:text-[#68727D]"
              type="text"
              placeholder="xyz@gmail.com"
              name="email"
              onChange={handleOnChange}
              value={userInfo.email}
            />
            <p className="text-[#68727D] font-normal text-[14px] font-Inter">
              The email address associated with this account
            </p>
          </div>

          <div className=" my-[28px]">
            <label
              htmlFor="phoneno"
              className="text-[#252525] font-medium text-[14px] font-Inter"
            >
              Phone number
            </label>
            <input
              className="h-10  border border-[#EAEBF0] my-[6px] rounded  w-full focus:ring-0 focus:outline-none focus:!border-[#EAEBF0] font-normal text-[15px] font-Inter placeholder:text-[#68727D]"
              type="number"
              placeholder="+49 1525 235548324"
              name="contact"
              onChange={handleOnChange}
              value={userInfo.contact}
            />
            <p className="text-[#68727D] font-normal text-[14px] font-Inter">
              The phone number associated with this account
            </p>
          </div>

          <div className="flex sm:justify-start justify-center">
            <button className="bg-[#D4DB33] hover:bg-[#5E5ADB] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[50px] rounded-md">
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
