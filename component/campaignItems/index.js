import React from "react";
import { IconContext } from "react-icons";

const CampaignItems = ({ name, description, color, icon }) => {
  return (
    <div className={`!h-[246px] w-[254px] border border-[#C4C4C7] mx-auto rounded-[4px] hover:bg-[#F2F0F4]`}>
      <div className="flex flex-col items-center justify-center w-full h-full ">
        <div className="p-2 rounded-[8px]" style={{
          background: "linear-gradient(0deg, rgba(220, 53, 69, 0.05) 0%, rgba(220, 53, 69, 0.05) 100%), #FEFBFF"
        }}>
        <img src="/icons/Subject.svg" className="!w-[72px] !h-[72px]" />
        </div>

        <h3 className="text-center text-[#DC3545] text-[24px] py-4">{name.length > 12 ? `${name.slice(0,12)}...`:name}</h3>
        <p className="text-center text-black text-[14px] leading-4 font-[400]">{description ? description :"توضیحات ندارد"}</p>
      </div>
    </div>
  );
};

export default CampaignItems;
