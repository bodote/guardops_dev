"use client"
import React, { useEffect, useState } from "react";
import { HubDownloadIcon,   HubDeleteIcon, HubShareIcon, HubUnshareIcon, HubRefreshIcon } from "@/public/Assets/Icons/Allsvg";
import { useCookies } from 'next-client-cookies';



//TODO: different tables and backgrounds for shared, available, subscribed, unshared templates
const MyPrompts = () => {
    
  const [unsharedTemplates, setUnsharedTemplates] = useState([]);
  const [sharedTemplates, setSharedTemplates] = useState([]);
  const [subscribedTemplates, setSubscribedTemplates] = useState([]);
  const [expandedTemplateId, setExpandedTemplateId] = useState(null);

  const toggleExpand = (templateId) => {
    if (expandedTemplateId === templateId) {
      setExpandedTemplateId(null);
    } else {
      setExpandedTemplateId(templateId);
    }
  };
  
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
    const data = res.data;
    if (data.unshared_templates) {
      setUnsharedTemplates(data.unshared_templates);
    }
    if (data.shared_templates) {
      setSharedTemplates(data.shared_templates);
    }if (data.subscribed_templates) {
      setSubscribedTemplates(data.subscribed_templates);
    }
  };

  const unshareTemplate = async (e, template_id) => {
    e.stopPropagation(); // Stop event propagation to prevent row expansion

    const params = {template_id:template_id};
    const response = await fetch(`/api/prompthub`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
     
    });

    const res = await response.json();
    console.log(res);
    getTemplates();

  };

  const shareTemplate = async (e, template_id) => {
    e.stopPropagation(); // Stop event propagation to prevent row expansion

    const params = {template_id:template_id,share:true};
    const response = await fetch(`/api/prompthub/share`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
     
    });

    const res = await response.json();
    console.log(res);
    getTemplates();
  };


  
  const deleteTemplate = async (e,template_id) => {
    e.stopPropagation(); // Stop event propagation to prevent row expansion

    const params = {template_id:template_id};
    const response = await fetch(`/api/prompthub`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
     
    });

    const res = await response.json();
    console.log(res);
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
              
                  {sharedTemplates.map((template) => (<React.Fragment  key={template.template_id}>
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
                            {template.user_id}
                          </p>
                         
                        </div>
                      </td>
                      
                      <td className="p-[15px_24px]">
                        <div className="flex justify-end cursor-pointer">
                            <button 
                        onClick={(e) => {
                          unshareTemplate(e,template.template_id);
                        }} className="bg-[#f7a6a6] hover:bg-[#d63131] transition-colors  rounded-full  cursor-pointer ">
                          <HubUnshareIcon className="text-[20px]" />
                          </button>
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
                   <tr>
    <td colSpan="6" className="border-t border-gray-200 dark:border-gray-700"></td>
  </tr>
                

                   {unsharedTemplates.map((template) => (<React.Fragment  key={template.template_id}>
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
                        <div className="flex justify-end cursor-pointer">
                        <button 
                        onClick={(e) => {
                          shareTemplate(e, template.template_id);
                         
                        }} className="bg-[#a6f7c7] hover:bg-[#31d674] transition-colors  rounded-full  cursor-pointer ">
                          <HubShareIcon className="text-[20px]" />
                          </button>
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
                    <tr>
    <td colSpan="6" className="border-t border-b-gray-700 dark:border-gray-700"></td>
  </tr>

                 {subscribedTemplates.map((template) => (<React.Fragment  key={template.template_id}>
                  <tr 
                   
                    className={`border-b-[#EAECF0] border-b-[1px] hover:bg-[#d6d6d6]  hover:cursor-pointer`}  onClick={() => toggleExpand(template.template_id)}
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
                      <div className="flex justify-end cursor-pointer">
                      {template.update_available ? (//TODO: UpdateTemplateFromHub
          <HubRefreshIcon className="text-[20px]" />
        ) : (
          <button 
          onClick={(e) => {
            deleteTemplate(e, template.template_id);
           
          }} className="bg-[#f7a6a6] hover:bg-[#d63131] transition-colors  rounded-full  cursor-pointer ">
          <HubDeleteIcon className="text-[20px]" />
          </button>)}                      </div>
                    </td>
                  </tr>
                     {expandedTemplateId === template.template_id && (
                       <tr >
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
