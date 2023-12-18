import { DeteleIcon } from "@/public/Assets/Icons/Allsvg";
import { FiPlus } from "react-icons/fi";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Apimanagement = () => {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [keyDetails, setkeyDetails] = useState([]);
  const [latestGeneratedKey, setLatestGeneratedKey] = useState("");
  const [deletedKey, setDeletedKey] = useState("");

  const getUserKeyDetails = async () => {
    const formData = {
      user_id: "demouser1",
    };

    try {
      const response = await fetch(
        `/api/manageKeys?user_id=${formData.user_id}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.keys) {
          setkeyDetails(responseData.keys);
        }
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const ganerateNewKey = async () => {
    const formData = {
      user_id: "demouser1",
    };

    try {
      const response = await fetch("/api/manageKeys", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData) {
          setLatestGeneratedKey(responseData);
          getUserKeyDetails();
        }
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  const handleDeleteKey = async () => {
    const formData = {
      user_id: "demouser1",
      key_hash: deletedKey.hash,
    };
    try {
      const response = await fetch("/api/manageKeys", {
        method: "DELETE",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData) {
          setLatestGeneratedKey(responseData);
          getUserKeyDetails();
        }
      } else {
        console.error("API request failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  useEffect(() => {
    getUserKeyDetails();
  }, []);
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
              {keyDetails &&
                keyDetails.map((val, i) => (
                  <tr
                    key={i}
                    className="align-middle border-b border-[#334851] border-opacity-[0.1]"
                  >
                    <td className="py-[14px] px-[16px] text-[16px] font-light font-Roboto text-[#454B54] text-center">
                      {`key ${i}`}
                    </td>
                    <td className="py-[14px] px-[16px] text-[16px] font-light font-Roboto text-[#454B54] text-center">
                      {val.hint}
                    </td>
                    <td className="py-[14px] px-[16px] text-[16px] font-light font-Roboto text-[#454B54] text-center">
                      {val.created}
                    </td>
                    <td className="py-[14px] px-[16px] text-[16px] font-light font-Roboto text-[#454B54] text-center">
                      {val.lastused}
                    </td>
                    <td className="py-[14px] px-[16px] text-[16px] font-light font-Roboto text-[#454B54] text-center">
                      <button
                        onClick={() => {
                          setOpen(true);
                          setDeletedKey(val);
                        }}
                      >
                        <DeteleIcon />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="sm:mt-[64px] mt-[30px] flex sm:justify-start justify-center">
          <button
            onClick={() => {
              setModal(true);
              ganerateNewKey();
            }}
            className="bg-[#D4DB33] text-[#FFFFFF] font-medium text-[14px] font-Inter py-[6px] px-[12px] rounded-md flex items-center sm:gap-[10px] gap-[5px]"
          >
            <FiPlus />
            Create a new secret key
          </button>
        </div>
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-transparent bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg border border-[#ccc] bg-white text-left transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto z-50 outline-none ">
                      <div className="relative w-full  mx-auto max-w-[470px]">
                        <div className="rounded-lg  relative flex flex-col w-full bg-white outline-none focus:outline-none  sm:px-[41px] px-[15px]">
                          <h3 className="text-[14px] font-medium font-Inter text-[#000000] py-[10px] text-center">
                            Delete selected API-Key
                          </h3>
                          <p className="text-left sm:text-[16px] text-[13px] font-light font-Inter text-[#454B54] ">
                            The selected api-key will be deleted. All
                            application with this key will not be traced
                            anymore.
                          </p>
                          <input
                            type="text"
                            name="emailaddresss"
                            id="emailaddresss"
                            value={deletedKey.hint}
                            disabled
                            className="h-10 bg-[#F7F7F8] border border-[#EAEBF0] mt-[6px] rounded  w-full font-normal text-[15px] font-Inter placeholder:text-[#000000]"
                          />

                          <div className="flex justify-center my-[18px] sm:gap-[36px] gap-[15px] flex-wrap">
                            <button
                              onClick={() => {
                                setOpen(false);
                                handleDeleteKey();
                              }}
                              className=" bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
                            >
                              Delete Key forever
                            </button>
                            <button
                              onClick={() => setOpen(false)}
                              className=" bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        <Transition.Root show={modal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-transparent bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg border border-[#ccc] bg-white text-left transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto z-50 outline-none ">
                      <div className="relative w-full  mx-auto max-w-[470px]">
                        <div className="rounded-lg  relative flex flex-col w-full bg-white outline-none focus:outline-none  sm:px-[41px] px-[15px]">
                          <h3 className="text-[14px] font-medium font-Inter text-[#000000] py-[10px] text-center">
                            Generated API-KEY
                          </h3>
                          <p className="text-left sm:text-[16px] text-[13px] font-light font-Inter text-[#454B54] ">
                            The following API-KEY was created. Be Sure that this
                            key will only be shown once. Copy it. If you forget
                            it, please recreate a new one.
                          </p>
                          <input
                            type="text"
                            name="emailaddresss"
                            id="emailaddresss"
                            value={latestGeneratedKey}
                            className="h-10 bg-[#F7F7F8] border border-[#EAEBF0] mt-[6px] rounded  w-full font-normal text-[15px] font-Inter placeholder:text-[#000000]"
                            placeholder="coai-ske234fsf3-4refrwqr-213-err3"
                          />

                          <div className="flex justify-center my-[18px] sm:gap-[36px] gap-[15px] flex-wrap">
                            <button
                              onClick={() => setModal(false)}
                              className=" bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
                            >
                              Copy key to clipboard
                            </button>
                            <button
                              onClick={() => setModal(false)}
                              className=" bg-[#D4DB33] hover:bg-[#0D859A] text-[#000000] font-medium text-[14px] font-Inter py-[6px] px-[14px] rounded-md"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </>
  );
};

export default Apimanagement;
