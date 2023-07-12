import React from "react";

const CampaignListItems = ({ name }) => {
  return (
    <div className="flex items-center justify-start h-auto gap-2 py-2 pl-20 pr-2 bg-white border rounded-[8px]">
      <div className="p-4 border border-black rounded-[8px] w-fit">
        <img src="/icons/Subject.svg" className="!w-[72px] !h-auto" />
      </div>

      <div className="flex flex-col items-start justify-center !h-[100%]">
        <p className="text-[24px] pb-3">{name}</p>
        <p className="text-[14px]">میخواهم برای کسب و.....</p>
      </div>
    </div>
  );
};

export default CampaignListItems;
