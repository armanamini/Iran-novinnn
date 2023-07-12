import React from "react";
import { IconContext } from "react-icons";

const CampaignItems = ({ name, description, color, icon }) => {
  return (
    <div
      className={
        color
          ? `!h-[190px] w-[170px] border border-black rounded-[8px]`
          : `!h-[190px] w-[170px] bg-red rounded-[8px]`
      }
    >
      <div className="flex flex-col items-center justify-center w-full h-full">
        <img src="/icons/Subject.svg" className="!w-[75px] !h-auto" />

        <h3 className="text-center text-black text-[18px] py-4">{name}</h3>
        <p className="text-center text-black text-[15px]">{description}</p>
      </div>
    </div>
  );
};

export default CampaignItems;
