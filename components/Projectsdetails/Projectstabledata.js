import { ThreeDotsIcon, UpDownIcon } from "@/public/Assets/Icons/Allsvg";
import React from "react";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
const data = [
  {
    id: "1",
    kind: "Chain",
    input: "Was ist im Dias Projekt zu beachten?",
    output: "Was ist im Dias Projekt zu beachten?",
    starttime: "15 Mar 2021",
    datetime: "12:47 PM",
    latency: "2.55",
    totaltokens: "4589",
    status: "",
    action: "",
  },
  {
    id: "1",
    kind: "Chain",
    input: "Was ist im Dias Projekt zu beachten?",
    output: "Was ist im Dias Projekt zu beachten?",
    starttime: "15 Mar 2021",
    datetime: "12:47 PM",
    latency: "2.55",
    totaltokens: "4589",
    status: "",
    action: "",
  },
  {
    id: "1",
    kind: "Chain",
    input: "Was ist im Dias Projekt zu beachten?",
    output: "Was ist im Dias Projekt zu beachten?",
    starttime: "15 Mar 2021",
    datetime: "12:47 PM",
    latency: "2.55",
    totaltokens: "4589",
    status: "",
    action: "",
  },
  {
    id: "1",
    kind: "Chain",
    input: "Was ist im Dias Projekt zu beachten?",
    output: "Was ist im Dias Projekt zu beachten?",
    starttime: "15 Mar 2021",
    datetime: "12:47 PM",
    latency: "2.55",
    totaltokens: "4589",
    status: "",
    action: "",
  },
  {
    id: "1",
    kind: "Chain",
    input: "Was ist im Dias Projekt zu beachten?",
    output: "Was ist im Dias Projekt zu beachten?",
    starttime: "15 Mar 2021",
    datetime: "12:47 PM",
    latency: "2.55",
    totaltokens: "4589",
    status: "",
    action: "",
  },
  {
    id: "1",
    kind: "Chain",
    input: "Was ist im Dias Projekt zu beachten?",
    output: "Was ist im Dias Projekt zu beachten?",
    starttime: "15 Mar 2021",
    datetime: "12:47 PM",
    latency: "2.55",
    totaltokens: "4589",
    status: "",
    action: "",
  },
  {
    id: "1",
    kind: "Chain",
    input: "Was ist im Dias Projekt zu beachten?",
    output: "Was ist im Dias Projekt zu beachten?",
    starttime: "15 Mar 2021",
    datetime: "12:47 PM",
    latency: "2.55",
    totaltokens: "4589",
    status: "",
    action: "",
  },
  {
    id: "1",
    kind: "Chain",
    input: "Was ist im Dias Projekt zu beachten?",
    output: "Was ist im Dias Projekt zu beachten?",
    starttime: "15 Mar 2021",
    datetime: "12:47 PM",
    latency: "2.55",
    totaltokens: "4589",
    status: "",
    action: "",
  },
  {
    id: "1",
    kind: "Chain",
    input: "Was ist im Dias Projekt zu beachten?",
    output: "Was ist im Dias Projekt zu beachten?",
    starttime: "15 Mar 2021",
    datetime: "12:47 PM",
    latency: "2.55",
    totaltokens: "4589",
    status: "",
    action: "",
  },
  {
    id: "1",
    kind: "Chain",
    input: "Was ist im Dias Projekt zu beachten?",
    output: "Was ist im Dias Projekt zu beachten?",
    starttime: "15 Mar 2021",
    datetime: "12:47 PM",
    latency: "2.55",
    totaltokens: "4589",
    status: "",
    action: "",
  },
  {
    id: "1",
    kind: "Chain",
    input: "Was ist im Dias Projekt zu beachten?",
    output: "Was ist im Dias Projekt zu beachten?",
    starttime: "15 Mar 2021",
    datetime: "12:47 PM",
    latency: "2.55",
    totaltokens: "4589",
    status: "",
    action: "",
  },
  {
    id: "1",
    kind: "Chain",
    input: "Was ist im Dias Projekt zu beachten?",
    output: "Was ist im Dias Projekt zu beachten?",
    starttime: "15 Mar 2021",
    datetime: "12:47 PM",
    latency: "2.55",
    totaltokens: "4589",
    status: "",
    action: "",
  },
];

// const repeatedArray = new Array(10).fill().map((_, index) => ({ ...data[0], id: index }));
// const repeatedData = Array.from({ length: 10 }, (_, index) => ({ ...data[0], id: index }));

const Projectstabledata = () => {
  return (
    <>
      <div className="overflow-auto">
        <table className="xl:w-full w-[1240px]">
          <thead>
            <tr className="border-b border-[#334851] border-opacity-[0.1]">
              <th className="py-[8px] text-[12px] font-medium font-Inter text-[#171C26]">
                <input
                  type="checkbox"
                  className="w-4 h-4 border border-[#334851] border-opacity-[0.3] rounded"
                />
              </th>
              <th></th>
              <th className="py-[8px] text-[12px] font-medium font-Inter text-[#171C26] ">
                <div className="flex items-center justify-center">
                  #
                  <a href="">
                    <UpDownIcon />
                  </a>
                </div>
              </th>
              <th className="uppercase py-[8px] text-[12px] font-medium font-Inter text-[#687182] ">
                <div className="flex items-center justify-center">
                  Kind
                  <a href="">
                    <UpDownIcon />
                  </a>
                </div>
              </th>

              <th className="uppercase py-[8px] text-[12px] font-medium font-Inter text-[#687182] ">
                input
              </th>
              <th className="uppercase py-[8px] text-[12px] font-medium font-Inter text-[#687182] ">
                Output
              </th>
              <th className="uppercase py-[8px] text-[12px] font-medium font-Inter text-[#687182] ">
                <div className="flex items-center justify-center">
                  start Time
                  <a href="">
                    <UpDownIcon />
                  </a>
                </div>
              </th>
              <th className="uppercase py-[8px] text-[12px] font-medium font-Inter text-[#687182] ">
                Latency
              </th>
              <th className="uppercase py-[8px] text-[12px] font-medium font-Inter text-[#687182] ">
                total tokens
              </th>
              <th className="uppercase py-[8px] text-[12px] font-medium font-Inter text-[#687182] ">
                status
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((val, i) => (
              <tr
                key={i}
                className="align-middle border-b border-[#334851] border-opacity-[0.1]"
              >
                <td className="py-[14px] px-[10px]  text-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border border-[#334851] border-opacity-[0.3] rounded"
                  />
                </td>
                <td>
                  <IoChevronForwardCircleOutline />
                </td>

                <td className="py-[14px] px-[10px] text-[14px] font-medium font-Inter text-center">
                  {val.id}
                </td>
                <td className="py-[14px] px-[10px] text-[14px] font-medium font-Inter text-[#0D859A] text-center">
                  {val.kind}
                </td>
                <td className="py-[14px] px-[10px] text-[14px] font-medium font-Inter text-[#0D859A] text-center">
                  {val.input}
                </td>
                <td className="py-[14px] px-[10px] text-[14px] font-medium font-Inter text-[#0D859A] text-center">
                  {val.output}
                </td>
                <td className="py-[14px] px-[10px] text-[14px] font-medium font-Inter text-center">
                  {val.starttime}
                  <br />
                  {val.datetime}
                </td>
                <td className="py-[14px] px-[10px] text-[14px] font-normal font-Inter text-[#464F60] text-center">
                  <button className="py-[5px] px-[10px] rounded-lg bg-[#E9EDF5]">
                    {val.latency}
                  </button>
                </td>
                <td className="py-[14px] px-[10px] text-[12px] font-medium font-Inter text-[#464F60] text-center">
                  <button className="py-[5px] px-[10px] rounded-lg bg-[#E9EDF5]">
                    {val.totaltokens}
                  </button>
                </td>
                <td className="py-[14px] px-[10px] text-[14px] font-medium font-Inter text-[#0D859A] text-center">
                  {val.status}
                </td>
                <td className="py-[14px] px-[10px] text-[14px] font-medium font-Inter ">
                  <ThreeDotsIcon />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Projectstabledata;
