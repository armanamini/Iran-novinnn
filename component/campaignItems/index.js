import React from "react";
import { IconContext } from "react-icons";

const CampaignItems = ({ name, description, color, icon }) => {
  return (
    <div className={`!h-[173px] w-[170px] border border-[#3E3E3E] mx-auto rounded-[4px]`}>
      <div className="flex flex-col items-center justify-center w-full h-auto">
        <img src="/icons/Subject.svg" className="!w-[74px] !h-auto pt-2" />

        <h3 className="text-center text-black text-[18px] py-4">{name.length > 12 ? `${name.slice(0,12)}...`:name}</h3>
        <p className="text-center text-black text-[12px] font-[400]">{description}</p>
      </div>
    </div>
  );
};

export default CampaignItems;
