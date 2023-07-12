import { Avatar, Input, Menu } from "antd";
import React, { Children, useState } from "react";
import { BiChevronUp } from "react-icons/bi";
import SubMenuItems from "../subMenuItems";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdMenu } from "react-icons/io";

const CampaignLayout = ({ children }) => {
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <div className="w-full mx-auto">
      <div className="grid h-auto grid-cols-12">
        <div
          className={
            openSideBar
              ? "h-screen col-span-2 border-l xl:col-span-3 !lg:absolute sm:absolute sm:w-full duration-[1000] sm:z-20 transition-transform  sm:bg-white"
              : "h-screen col-span-2 border-l xl:col-span-3 lg:hidden"
          }
        >
          <div className="p-6">
            <div className="flex flex-row-reverse items-start justify-center gap-2 pt-1 pb-3">
              {/* <img src="/icons/Vector.svg" className="!w-[40px] !h-[30px]" /> */}
              <h2
                className="text-[#1890FF] text-[20px] font-bold !font-Roboto "
                style={{
                  fontFamily: "Roboto",
                }}
              >
                <img src="/images/mainLogo.png" className="!w-[80%] pb-3" />
              </h2>
              <div className="!w-[25px]">
                <AiOutlineClose
                  color="black"
                  size={"25px"}
                  className="hidden lg:block"
                  onClick={() => setOpenSideBar(false)}
                />
              </div>
            </div>
            <SubMenuItems />
          </div>
        </div>

        <div
          className={
            openSideBar
              ? "col-span-10 xl:col-span-9 h-[80px] border-b lg:block sm:col-span-12"
              : "col-span-10 xl:col-span-9 h-[80px] border-b lg:col-span-12"
          }
        >
          <div className="flex items-center justify-between h-full px-10">
            {!openSideBar && (
              <IoMdMenu
                color="black"
                size={"30px"}
                className="hidden lg:block"
                onClick={() => setOpenSideBar(true)}
              />
            )}
            <div className="w-4/12 ">
              <Input placeholder="search" />
            </div>

            <div>
              <Avatar size={50} className="!left-0">
                <div className="flex items-center justify-center !w-full">
                  <p className="text-center font-[40px] !text-white">A</p>
                </div>
              </Avatar>
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CampaignLayout;
