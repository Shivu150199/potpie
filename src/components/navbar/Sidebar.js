import React from "react";
import logo from "../../logo.png";
import user from "../../user.png";

import { IoMenu } from "react-icons/io5";
import { MdOutlineRestore } from "react-icons/md";
import { RiStackLine } from "react-icons/ri";
import { FaGitAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="bg-[#363636] h-[100vh] flex items-start justify-center ">
      <div className="  flex flex-col justify-center items-center h-full">
        <div className="logo flex-1 flex justify-center items-center h-[50px] mb-1  ">
          <img src={logo} alt="logo" className="w-[42px] h-[36px] mt-3" />
        </div>
        <div className="icons flex-[18] flex justify-start flex-col items-center  py-3  ">
          <button>
            <IoMenu className="text-white w-[42px] h-[36px] my-3 " />
          </button>
          <button>
            <MdOutlineRestore className="text-white w-[42px] h-[36px] my-3" />
          </button>
          <button>
            <RiStackLine className="text-white w-[42px] h-[36px] my-3" />
          </button>
          <button>
            <FaGitAlt className="text-white w-[42px] h-[36px] my-3" />
          </button>
        </div>

        <div className="user flex-1 flex justify-center items-center  ">
          <img src={user} alt="logo" className="w-[42px] h-[36px]" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
