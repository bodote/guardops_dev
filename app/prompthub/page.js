"use client"
import React, { useEffect, useState } from "react";
import { HubDownloadIcon, RightIcon, ThreeDotsIcon } from "@/public/Assets/Icons/Allsvg";
import Logout from "@/components/Logout/Logout";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useCookies } from 'next-client-cookies';
//TODO: different tables and backgrounds for shared, available, subscribed, unshared templates
const PromptHub = () => {
  const [unsharedTemplates, setUnsharedTemplates] = useState([]);
  const [sharedTemplates, setSharedTemplates] = useState([]);
  const [subscribedTemplates, setSubscribedTemplates] = useState([]);
  const [availableTemplates, setAvailableTemplates] = useState([]);

  let rank = 1;
  const cookieStore = useCookies()
  const user_id = cookieStore.get("user_id").value;
  const getTemplates = async () => {
    const response = await fetch(`/api/prompthub`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
     
    });

    const res = await response.json();
    const data = res.data
    console.log(data)
    if (data.unshared_templates) {
      setUnsharedTemplates(data.unshared_templates);
    }
    if (data.shared_templates) {
      setSharedTemplates(data.shared_templates);
    }if (data.subscribed_templates) {
      setSubscribedTemplates(data.subscribed_templates);
    }if (data.available_templates) {
      setAvailableTemplates(data.available_templates);
    }
  };

  useEffect(() => {
    getTemplates();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full h-screen overflow-y-auto sm:ml-[96px] ml-[72px]">
        <div className="flex justify-between sm:px-[22px] px-[16px] py-[11px] border-b border-[#CCCCCC]">
          <div className="flex items-center gap-[5px]">
            <h1 className="font-Archivo text-[12px] font-normal text-[#000]">
              COAI
            </h1>
            <RightIcon />
            <h1 className="font-Archivo text-[12px] font-normal text-[#000]">
              Monitoring
            </h1>
          </div>
          <Logout />
        </div>
        <div className="sm:px-[55px] px-[16px] mt-[24px]">
          <h1 className="font-Archivo lg:text-[32px] text-[22px] text-black font-thin">
            Language Model Leaderboard
          </h1>
          <div className="xl:pl-[47px] lg:pl-[20px] xl:pr-[93px] lg:pr-[40px] xl:mt-[79px] md:mt-[50px] sm:mt-[30px] mt-[20px]">
            <div className="border rounded-lg dark:border-[#EAECF0] shadow-[0px_1px_3px_rgba(16,24,40,0.1),_0px_1px_2px_rgba(16,24,40,0.06)] w-full overflow-x-auto overflow-y-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-[#F9FAFB] dark:bg-gray-700">
                  <tr>
                    <th className="text-[#475467] text-[12px] font-Inter p-[13px_24px] text-left whitespace-nowrap w-0">
                      <HubDownloadIcon/>
                    </th>
                    <th className="text-[#475467] text-[12px] font-Inter p-[13px_24px] text-left whitespace-nowrap">
                      Name
                    </th>
                    <th className="text-[#475467] text-[12px] font-Inter p-[13px_24px] text-left whitespace-nowrap">
                      Description
                    </th>
                    <th className="text-[#475467] text-[12px] font-Inter p-[13px_24px] text-left whitespace-nowrap">
                      Link
                    </th>
                    <th className="text-[#475467] text-[12px] font-Inter p-[13px_24px] text-left whitespace-nowrap">
                      
                    </th>
                    <th className=" p-[13px_24px]"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {sharedTemplates.map((template) => (
                    <tr
                      key={template.template_id}
                      className={`border-b-[#EAECF0] border-b-[1px] ${
                        template.user_id != user_id && "bg-[#D4DB33]"
                      }`}
                    >
                      <td className="text-[#101828] text-[14px] font-Inter p-[13px_24px] text-left">
                        {template.user_id == user_id ? rank++ : "-"}
                      </td>
                      <td className="p-[15px_24px]">
                        <div>
                          <p className="text-[#101828] text-[14px] font-Inter font-medium whitespace-nowrap">
                            {template.name}
                          </p>
                         
                        </div>
                      </td>
                      <td className="p-[15px_24px]">
                        <div>
                          <p className="text-[#101828] text-[14px] font-Inter font-medium whitespace-nowrap">
                            {template.description}
                          </p>
                          
                        </div>
                      </td>
                      <td className="p-[15px_24px]">
                        <div>
                          <p className="text-[#101828] text-[14px] font-Inter font-medium whitespace-nowrap">
                            {template.user_id}
                          </p>
                         
                        </div>
                      </td>
                      <td className="p-[15px_24px]">
                        <span
                          className={`text-[#027A48] font-medium text-[12px] font-Inter p-[2px_8px] block w-fit rounded-2xl ${
                            template.user_id != user_id
                              ? "bg-[#B5D72F]"
                              : "bg-[#ECFDF3]"
                          } ${template.elo === null && "w-[40px] h-[22px]"}`}
                        >
                          {template.elo}
                        </span>
                      </td>
                      <td className="p-[15px_24px]">
                        <div className="flex justify-end cursor-pointer">
                          <ThreeDotsIcon className="text-[20px]" />
                        </div>
                      </td>
                    </tr>
                  ))}
                  {}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptHub;
