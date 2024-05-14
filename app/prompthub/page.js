"use client"

import React, { useEffect, useState } from "react";
import { RightIcon, ThreeDotsIcon } from "@/public/Assets/Icons/Allsvg";
import Logout from "@/components/Logout/Logout";
import Sidebar from "@/components/Sidebar/Sidebar";

const Leaderboard = () => {
  const [models, setModels] = useState([]);
  let rank = 1;

  const getModels = async () => {
    const response = await fetch(`/api/manageModels`, {
      method: "GET",
    });
    const data = await response.json();
    if (data.models) {
      setModels(data.models.sort((a, b) => (b.elo || 0) - (a.elo || 0)));
    }
  };

  useEffect(() => {
    getModels();
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
                      Rank
                    </th>
                    <th className="text-[#475467] text-[12px] font-Inter p-[13px_24px] text-left whitespace-nowrap">
                      Model Name
                    </th>
                    <th className="text-[#475467] text-[12px] font-Inter p-[13px_24px] text-left whitespace-nowrap">
                      Provider
                    </th>
                    <th className="text-[#475467] text-[12px] font-Inter p-[13px_24px] text-left whitespace-nowrap">
                      Context length
                    </th>
                    <th className="text-[#475467] text-[12px] font-Inter p-[13px_24px] text-left whitespace-nowrap">
                      Score
                    </th>
                    <th className=" p-[13px_24px]"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {models.map((model) => (
                    <tr
                      key={model.model_id}
                      className={`border-b-[#EAECF0] border-b-[1px] ${
                        model.user_id !== "0" && "bg-[#D4DB33]"
                      }`}
                    >
                      <td className="text-[#101828] text-[14px] font-Inter p-[13px_24px] text-left">
                        {model.user_id === "0" ? rank++ : "-"}
                      </td>
                      <td className="p-[15px_24px]">
                        <div>
                          <p className="text-[#101828] text-[14px] font-Inter font-medium whitespace-nowrap">
                            {model.name}
                          </p>
                          <p className="text-[#475467] text-[14px] font-Inter whitespace-nowrap">
                            {model.id1}
                          </p>
                        </div>
                      </td>
                      <td className="p-[15px_24px]">
                        <div>
                          <p className="text-[#101828] text-[14px] font-Inter font-medium whitespace-nowrap">
                            {model.provider}
                          </p>
                          <p className="text-[#475467] text-[14px] font-Inter whitespace-nowrap">
                            {model.model_description}
                          </p>
                        </div>
                      </td>
                      <td className="p-[15px_24px]">
                        <div>
                          <p className="text-[#101828] text-[14px] font-Inter font-medium whitespace-nowrap">
                            {model.context} Tokens
                          </p>
                          <p className="text-[#475467] text-[14px] font-Inter whitespace-nowrap">
                            {model.input_price.split(" / ")[0]}/
                            {model.output_price.split(" / ")[0]} € per Token
                          </p>
                        </div>
                      </td>
                      <td className="p-[15px_24px]">
                        <span
                          className={`text-[#027A48] font-medium text-[12px] font-Inter p-[2px_8px] block w-fit rounded-2xl ${
                            model.user_id !== "0"
                              ? "bg-[#B5D72F]"
                              : "bg-[#ECFDF3]"
                          } ${model.elo === null && "w-[40px] h-[22px]"}`}
                        >
                          {model.elo}
                        </span>
                      </td>
                      <td className="p-[15px_24px]">
                        <div className="flex justify-end cursor-pointer">
                          <ThreeDotsIcon className="text-[20px]" />
                        </div>
                      </td>
                    </tr>
                  ))}
                  {/* <tr className="border-b-[#EAECF0] border-b-[1px]">
                    <td className="text-[#101828] text-[14px] font-Inter p-[13px_24px] text-left">
                      2
                    </td>
                    <td className="p-[15px_24px]">
                      <div>
                        <p className="text-[#101828] text-[14px] font-Inter font-medium whitespace-nowrap">
                          GPT-3.5
                        </p>
                        <p className="text-[#475467] text-[14px] font-Inter whitespace-nowrap">
                          gpt-3.5-turbo
                        </p>
                      </div>
                    </td>
                    <td className="p-[15px_24px]">
                      <div>
                        <p className="text-[#101828] text-[14px] font-Inter font-medium whitespace-nowrap">
                          OpenAI
                        </p>
                        <p className="text-[#475467] text-[14px] font-Inter whitespace-nowrap">
                          Model is capable of all kinds of tasks
                        </p>
                      </div>
                    </td>
                    <td className="p-[15px_24px]">
                      <div>
                        <p className="text-[#101828] text-[14px] font-Inter font-medium whitespace-nowrap">
                          32000 Tokens
                        </p>
                        <p className="text-[#475467] text-[14px] font-Inter whitespace-nowrap">
                          0.001/0.005 € per Token
                        </p>
                      </div>
                    </td>
                    <td className="p-[15px_24px]">
                      <span className="bg-[#ECFDF3] text-[#027A48] font-medium text-[12px] font-Inter p-[2px_8px] block w-fit rounded-2xl">
                        1249
                      </span>
                    </td>
                    <td className="p-[15px_24px]">
                      <div className="flex justify-end cursor-pointer">
                        <ThreeDotsIcon className="text-[20px]" />
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b-[#EAECF0] border-b-[1px] bg-[#D4DB33]">
                    <td className="text-[#101828] text-[14px] font-Inter p-[13px_24px] text-left">
                      -
                    </td>
                    <td className="p-[15px_24px]">
                      <div>
                        <p className="text-[#101828] text-[14px] font-Inter font-medium whitespace-nowrap">
                          Phoenix
                        </p>
                        <p className="text-[#475467] text-[14px] font-Inter whitespace-nowrap">
                          phoenix-72b
                        </p>
                      </div>
                    </td>
                    <td className="p-[15px_24px]">
                      <div>
                        <p className="text-[#101828] text-[14px] font-Inter font-medium whitespace-nowrap">
                          Custom
                        </p>
                        <p className="text-[#475467] text-[14px] font-Inter whitespace-nowrap">
                          Custom self hosted model
                        </p>
                      </div>
                    </td>
                    <td className="p-[15px_24px]">
                      <div>
                        <p className="text-[#101828] text-[14px] font-Inter font-medium whitespace-nowrap">
                          32000 Tokens
                        </p>
                        <p className="text-[#475467] text-[14px] font-Inter whitespace-nowrap">
                          0.001/0.005 € per Token
                        </p>
                      </div>
                    </td>
                    <td className="p-[15px_24px]">
                      <span className="bg-[#B5D72F] text-[#027A48] font-medium text-[12px] font-Inter p-[2px_8px] block w-fit rounded-2xl">
                        1244
                      </span>
                    </td>
                    <td className="p-[15px_24px]">
                      <div className="flex justify-end cursor-pointer">
                        <ThreeDotsIcon className="text-[20px]" />
                      </div>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
