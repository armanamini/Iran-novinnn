import { Avatar, Input, Menu } from "antd";
import React, { Children, useState } from "react";
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
              ? "h-screen col-span-2  xl:col-span-3 !lg:absolute sm:absolute sm:w-full duration-[1000] sm:z-20 transition-transform sm:bg-white"
              : "h-screen col-span-2  xl:col-span-3 lg:hidden "
          }
        >
          <div className="p-6 ">
            <div
              className="text-[#1890FF] pt-2 text-[20px] font-bold !font-Roboto mx-auto flex flex-col items-center justify-center gap-y-2 "
              style={{
                fontFamily: "Roboto",
              }}
            >
              <img
                src="/images/launch9_copy.png"
                className="!w-[60%] mx-auto"
              />
              <p className="text-[12px]">version:1.2.0</p>
            </div>
            <div className="flex flex-row-reverse items-center justify-center pb-3">
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
              ? "col-span-10  xl:col-span-9 h-[56px] border-b lg:block sm:col-span-12"
              : "col-span-10  border-[#8F909A] xl:col-span-9 h-[56px] border-b-[1px] lg:col-span-12"
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
              <div className="py-2 border rounded-[4px] pr-4 flex justify-between pl-4 ">
                <input
                  type="text"
                  placeholder="جستجو  "
                  className="placeholder:!text-[#E2E2EC]"
                />
                <img src="/icons/search.svg" className="!w-[24px]" />
              </div>
            </div>

            <div className="flex items-center justify-end h-full gap-6">
              <div>
                <img src="/icons/star.svg" className="!w-[24px] !h-[22px]" />
              </div>
              <p className="text-[16px] font-[500] text-[#DC3545]">
                موجودی: ۱/۰۰۰/۰۰۰- تومان
              </p>
              <div className="bg-[#FFD2D6] px-6 h-[40px] flex items-center justify-center rounded-[2px]">
                <p className="text-[#DC3545] text-[14px] font-[500]">
                  افزایش موجودی
                </p>
              </div>
              <img
                src="/icons/notifications.svg"
                className="!w-[32px] !h-[32px]"
              />

              <Avatar size={40} className="!left-0 bg-[#FEF9F9]">
                <div className="flex items-center justify-center !w-full">
                  <p className="text-center font-[40px] !text-[#DC3545]">A</p>
                </div>
              </Avatar>
            </div>
          </div>
          <div className="max-w-[100rem] bg-[#FDFBFF] h-screen mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignLayout;
