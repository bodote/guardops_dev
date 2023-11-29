import React from "react";

const Profile = () => {
  return (
    <>
      <div className="sm:w-[360px] w-auto">
        <div className="">
          <label
            for="name"
            className="text-[#252525] font-medium text-[14px] font-Inter"
          >
            Name
          </label>
          <input
            type="text"
            name="emailaddress"
            id="emailaddress"
            className="h-10  border border-[#EAEBF0] my-[6px] rounded  w-full focus:ring-0 focus:outline-none focus:!border-[#EAEBF0]  font-normal text-[15px] font-Inter"
            placeholder="User 1"
          />
          <p className="text-[#68727D] font-normal text-[14px] font-Inter">
            The name associated with this account
          </p>
        </div>
        <div className=" my-[28px]">
          <label
            for="email"
            className="text-[#252525] font-medium text-[14px] font-Inter"
          >
            Email address
          </label>
          <input
            type="text"
            name="emailaddresss"
            id="emailaddresss"
            className="h-10  border border-[#EAEBF0] my-[6px] rounded  w-full focus:ring-0 focus:outline-none focus:!border-[#EAEBF0] font-normal text-[15px] font-Inter placeholder:text-[#68727D]"
            placeholder="mail@gmail.com"
          />
          <p className="text-[#68727D] font-normal text-[14px] font-Inter">
            The email address associated with this account
          </p>
        </div>

        <div className=" my-[28px]">
          <label
            for="phoneno"
            className="text-[#252525] font-medium text-[14px] font-Inter"
          >
            Phone number
          </label>
          <input
            type="number"
            name="phoneno"
            id="phoneno"
            className="h-10  border border-[#EAEBF0] my-[6px] rounded  w-full focus:ring-0 focus:outline-none focus:!border-[#EAEBF0] font-normal text-[15px] font-Inter placeholder:text-[#68727D]"
            placeholder="+49 1525 235548324"
          />
          <p className="text-[#68727D] font-normal text-[14px] font-Inter">
            The phone number associated with this account
          </p>
        </div>

        <div class="flex sm:justify-start justify-center">
          <button className="bg-[#D4DB33] hover:bg-[#5E5ADB] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[50px] rounded-md">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
