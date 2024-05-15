"use client"
import React, { useEffect, useState } from "react";
import { HubDownloadIcon, HubSubscribeIcon } from "@/public/Assets/Icons/Allsvg";
import Logout from "@/components/Logout/Logout";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useCookies } from 'next-client-cookies';
import Profile from "@/components/Pageprofiledata/Profile";


//TODO: different tables and backgrounds for shared, available, subscribed, unshared templates
const MyPrompts = () => {
 
  const [availableTemplates, setAvailableTemplates] = useState([]);
  const [expandedTemplateId, setExpandedTemplateId] = useState(null);

  const toggleExpand = (templateId) => {
    if (expandedTemplateId === templateId) {
      setExpandedTemplateId(null);
    } else {
      setExpandedTemplateId(templateId);
    }
  };
 
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
    const data = res.data;
   
    if (data.available_templates) {
      setAvailableTemplates(data.available_templates);
    }
   
  };
  const subscribeToTemplate = async (e, template_id) => {
    e.stopPropagation(); // Stop event propagation to prevent row expansion

    const params = {template_id:template_id};
    const response = await fetch(`/api/prompthub/share/subscribe`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
     
    });

    const res = await response.json();
    getTemplates();
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
                    
                    <th className=" p-[13px_24px]"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              

                 {availableTemplates.map((template) => ( <React.Fragment  key={template.template_id}>
                  <tr
                   
                    className={`border-b-[#EAECF0] border-b-[1px] hover:bg-[#d6d6d6]  hover:cursor-pointer`} onClick={() => toggleExpand(template.template_id)}
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
                          {template.link}
                        </p>
                       
                      </div>
                    </td>
                    
                    <td className="p-[15px_24px]">
                      <div className="flex justify-end ">
                      <button 
                        onClick={(e) => {
                          subscribeToTemplate(e,template.template_id);
                         
                        }} className="bg-[#a6f7c7] hover:bg-[#31d674] transition-colors  rounded-full  cursor-pointer ">
                        <HubSubscribeIcon className="text-[20px] " /></button>
                      </div>
                    </td>
                  </tr>
                    {expandedTemplateId === template.template_id && (
                      <tr>
                        <td colSpan="6" className="border-t border-b-gray-700  border-b-4">
                          <div className="p-[15px_24px]">
                          
                            <p className="text-[#101828] text-[14px] font-Inter font-medium whitespace-nowrap">{template.template}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                    </React.Fragment>
                ))}
                </tbody>
              </table>
            </div>
          </div>
      
  );
};

export default MyPrompts;
