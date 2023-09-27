import React from "react";
import CampaignLayout from "../../core/component/campaignLayout";
import { useState } from "react";

const createBanner = () => {
  const [selectedBanner, setSelectedBanner] = useState([]);

  const handleSelectedBanner = (e) => {
    console.log(e.target.id);

  
    
  };

  return (
    <CampaignLayout>
      <div className="p-4">
        <h2 className="text-[16px]">بنر مورد نظر را انتخاب کنید</h2>
      </div>

      <div className="w-[300px] h-full cursor-pointer" onClick={handleSelectedBanner}>
        <img
          src="https://placehold.co/600x700"
          className="object-contain"
          id="600*700"
        />
      </div>

      {/* <div className="w-[300px] h-auto">
        <img src="https://placehold.co/300x100" className="object-contain"/>
      </div>

      
      <div className="w-[300px]">
        <img src="https://placehold.co/600x400" className="object-contain"/>
      </div> */}
    </CampaignLayout>
  );
};

export default createBanner;
