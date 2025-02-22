import React, { useState, useEffect } from "react";
import { Handle, Position } from "reactflow";
import arrowmain from "../../arrow-main.png";

const extractFunctionName = (str) => {
  const parts = str.split(":");
  return parts[parts.length - 1];
};

const extractFileName = (str) => {
  const parts = str.split("/");
  const lastPart = parts[parts.length - 1];
  const filenameAndFunction = lastPart.split(":");
  const filename = filenameAndFunction[0];
  return filename;
};
const getParamsArray = (params) => {
  const paramsArray = [];
  params.forEach((param) => {
    paramsArray.push(param.identifier);
  });
  return paramsArray;
};

const Card = ({ data }) => {
  const [functionName, setfunctionName] = useState();
  const [fileName, setfileName] = useState();
  const [params, setparams] = useState();
  useEffect(() => {
    setfunctionName(extractFunctionName(data.label.function));
    setparams(getParamsArray(data.label.params));
    setfileName(extractFileName(data.label.function));
  }, [data]);

  return (
    <>
      <Handle type="target" position={Position.Left} className="!opacity-0" />
      <div className=" card border w-[320px] h-[180px] border-[#FF7A00] bg-[#181E25] rounded  ">
        <div className="title p-2 flex border-b border-[#ff7a00] justify-between items-center">
          <div className="text-white font-medium">{fileName}</div>
          <div className="">
            <img src={arrowmain} alt="logo" className="w-[13px] h-[13px] " />
          </div>
        </div>
        <div className="px-2 body text-white">
          <div className=" pt-4  font-medium">{functionName}</div>
          <div className="font-medium text-[10px] mt-1.5">
            <span className="text-[#ff7a00]">“DependentLibs”</span> :
            [“sqlalchemy”]
          </div>
          <div className="font-medium text-[10px] mt-1.5">
            <span className="text-[#ff7a00]">“Params”</span> : [
            {params?.map((param, index) => (
              <span key={param}>
                {param}
                {index !== params.length - 1 && ", "}
              </span>
            ))}
            ]
          </div>
          <div className="font-medium text-[10px] mt-1.5">
            <span className="text-[#ff7a00]">“ResponseObject”</span> :{" "}
            {data.label.response_object === ""
              ? "null"
              : data.label.response_object}
          </div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        className="!opacity-0"
      />
    </>
  );
};

export default Card;
