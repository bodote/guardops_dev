import { DeteleIcon } from "@/public/Assets/Icons/Allsvg";
import { FiPlus } from "react-icons/fi";
import React, { useState } from "react";

const data = [
  {
    name: "Key1",
    key: "coai-...errr3",
    created: "10.3.2023",
    lastused: "18.11.23",
  },
  {
    name: "Key2",
    key: "coai-...dewr",
    created: "6.9.2022",
    lastused: "15.9.2022",
  },
  {
    name: "Key3",
    key: "coai-...dztr",
    created: "15.12.22",
    lastused: "20.12.22",
  },
];

const Apimanagement = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div>
        <p className="max-w-[900px] text-[#000000] font-normal sm:text-[16px] text-[14px] font-Archivo">
          Your secret API key is listed below. You can create as many API keys
          as you like. Please note, that we do not display your secret API keys
          again after you generate them.
        </p>
        <p className="max-w-[900px] text-[#000000] font-normal sm:text-[16px] text-[14px] font-Archivo mt-[10px]">
          Do not share your API key with others, or expose it in the browser or
          other client-side code. Please be aware COAI can automatically
          deactivate any API key that’ we found a s leaked publicy
        </p>
        <div className="sm:mt-[34px] mt-[20px]">
          <table className="xl:w-[735px] w-full">
            <thead>
              <tr className="border-b border-[#334851] border-opacity-[0.2]">
                <th className=" py-[8px] text-[16px] font-medium font-Roboto text-[#8F97A3] ">
                  Name
                </th>
                <th className=" py-[8px] text-[16px] font-medium font-Roboto text-[#8F97A3] ">
                  Key
                </th>
                <th className=" py-[8px] text-[16px] font-medium font-Roboto text-[#8F97A3] ">
                  Created
                </th>
                <th className=" py-[8px] text-[16px] font-medium font-Roboto text-[#8F97A3] ">
                  Last Used
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((val, i) => (
                <tr
                  key={i}
                  className="align-middle border-b border-[#334851] border-opacity-[0.1]"
                >
                  <td className="py-[14px] px-[16px] text-[16px] font-light font-Roboto text-[#454B54] text-center">
                    {val.name}
                  </td>
                  <td className="py-[14px] px-[16px] text-[16px] font-light font-Roboto text-[#454B54] text-center">
                    {val.key}
                  </td>
                  <td className="py-[14px] px-[16px] text-[16px] font-light font-Roboto text-[#454B54] text-center">
                    {val.created}
                  </td>
                  <td className="py-[14px] px-[16px] text-[16px] font-light font-Roboto text-[#454B54] text-center">
                    {val.lastused}
                  </td>
                  <td className="py-[14px] px-[16px] text-[16px] font-light font-Roboto text-[#454B54] text-center">
                    <button onClick={() => setShowModal(true)}>
                      <DeteleIcon />
                    </button>
                    {showModal ? (
                      <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                          <div className="relative w-full  mx-auto max-w-[470px]">
                            <div className="rounded-lg  relative flex flex-col w-full bg-white outline-none focus:outline-none border border-[#ccc] px-[41px]">
                              <h3 className="text-[14px] font-medium font-Inter text-[#000000] py-[10px] text-center">
                                Delete selected API-Key
                              </h3>
                              <p className="text-left text-[16px] font-light font-Inter text-[#454B54] ">
                                The selected api-key will be deleted. All
                                application with this key will not be traced
                                anymore.
                              </p>
                              <input
                                type="text"
                                name="emailaddresss"
                                id="emailaddresss"
                                className="h-10 bg-[#F7F7F8] border border-[#EAEBF0] mt-[6px] rounded  w-full font-normal text-[15px] font-Inter placeholder:text-[#000000]"
                                placeholder="coai-....-err3"
                              />

                              <div className="flex justify-center my-[18px] gap-[36px]">
                                <button
                                  onClick={() => setShowModal(false)}
                                  className=" bg-[#E33B32] hover:bg-[#0D859A] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
                                >
                                  Delete Key forever
                                </button>
                                <button
                                  onClick={() => setShowModal(false)}
                                  className=" bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sm:mt-[64px] mt-[30px] flex sm:justify-start justify-center">
          <button className="bg-[#D4DB33] text-[#FFFFFF] font-medium text-[14px] font-Inter py-[6px] px-[12px] rounded-md flex items-center sm:gap-[10px] gap-[5px]">
            <FiPlus />
            Create a new secret key
          </button>
        </div>
      </div>
    </>
  );
};

export default Apimanagement;
