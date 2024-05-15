"use client"
import React, { useEffect, useState } from "react";
import { HubDownloadIcon, RightIcon, ThreeDotsIcon, HubDeleteIcon, HubShareIcon, HubUnshareIcon, HubRefreshIcon } from "@/public/Assets/Icons/Allsvg";
import Logout from "@/components/Logout/Logout";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useCookies } from 'next-client-cookies';
import Profile from "@/components/Pageprofiledata/Profile";


//TODO: different tables and backgrounds for shared, available, subscribed, unshared templates
const MyPrompts = () => {
  const [unsharedTemplates, setUnsharedTemplates] = useState([]);
  const [sharedTemplates, setSharedTemplates] = useState([]);
  const [subscribedTemplates, setSubscribedTemplates] = useState([]);
  const [templateToUnshare, setTemplateToUnshare] = useState([])
  let rank = 1;
  const cookieStore = useCookies();
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
    if (data.unshared_templates) {
      setUnsharedTemplates(data.unshared_templates);
    }
    if (data.shared_templates) {
      setSharedTemplates(data.shared_templates);
    }if (data.subscribed_templates) {
      setSubscribedTemplates(data.subscribed_templates);
    }
  };

  const unshareTemplate = async (template_id) => {
    const params = {template_id:template_id};
    const response = await fetch(`/api/prompthub`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
     
    });

    const res = await response.json();
    console.log(res)
  };

  const shareTemplate = async (template_id) => {
    const params = {template_id:template_id,share:true};
    const response = await fetch(`/api/prompthub/share`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
     
    });

    const res = await response.json();
    console.log(res)
  };

  useEffect(() => {
    getTemplates();
  }, []);

  return (
      
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
                            <button 
                        onClick={() => {
                          unshareTemplate(template.template_id);
                          getTemplates();
                        }}>
                          <HubUnshareIcon className="text-[20px]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                   <tr>
    <td colSpan="6" className="border-t border-gray-200 dark:border-gray-700"></td>
  </tr>
                

                   {unsharedTemplates.map((template) => (
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
                        <button 
                        onClick={() => {
                          shareTemplate(template.template_id);
                          getTemplates();
                        }}>
                          <HubShareIcon className="text-[20px]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                    <tr>
    <td colSpan="6" className="border-t border-gray-200 dark:border-gray-700"></td>
  </tr>

                 {subscribedTemplates.map((template) => (
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
                      {template.update_available ? (
          <HubDeleteIcon className="text-[20px]" />
        ) : (
          <HubRefreshIcon className="text-[20px]" />
        )}                      </div>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
      
  );
};

export default MyPrompts;
