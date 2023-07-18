import React from "react";

const CampaignListItems = ({ name }) => {
  return (
    <div className="flex items-center justify-justify pr-3 !w-full h-[92px] gap-2 py-2 bg-white border border-[#D2D2D2] rounded-[4px]">
      <div className="p-4 flex items-center justify-center border border-[#3E3E3E] rounded-[16px] !w-[72px] !h-[72px]">
        <img src="/icons/nfc.svg" className="!w-[48px] !h-[48px]" />
      </div>
      <div className="flex flex-col items-start justify-center !h-[100%]">
        <p className="text-[22px] pb-3 font-[500]">{name.slice(0, 28)}</p>
        <p className="text-[12px] font-[400] text-[#45464F]">
          می خواهم برای کسب کار خود تبلیغ کنم.
        </p>
      </div>
    </div>
  );
};

export default CampaignListItems;
