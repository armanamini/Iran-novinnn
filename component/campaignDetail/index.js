import React from "react";
import { useSelector } from "react-redux";

const CamapignDetail = ({totalPrice}) => {
  const filledData = useSelector((state) => state.input);
  const textareaValue = filledData.textareaValue;
  const campaignNameValue = filledData.campaignNameValue;
  const campaignStartTimeValue = filledData.campaignStartTimeValue;
  const ProductUsageValue = filledData.ProductUsageValue
  return (
    <div className="w-full">
      <h3 className="pr-32">جزئیات کمپین</h3>

      <div className="w-full px-32 mt-10">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-1">
            <p>نام کمپین: </p>
            <p>{campaignNameValue}</p>
          </div>
          <div className="flex gap-1">
            <p>تاریخ شروع و پایان:</p>
            <p>{campaignStartTimeValue}</p>
          </div>
        </div>
      </div>

      <div className="w-full px-32 mt-10">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-1">
            <p>شبکه اجتماعی:</p>
            <p>{campaignNameValue}</p>
          </div>
          <div className="flex gap-1">
        <p>نوع کمپین:</p>
            <p>{campaignStartTimeValue}</p>
          </div>
        </div>
      </div>

      <div className="w-full px-32 mt-10">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-1">
            <p>موضوع:</p>
            <p>{campaignNameValue}</p>
          </div>
          <div className="flex gap-1">
        <p>مبلغ کل:</p>
            <p>{totalPrice}</p>
          </div>
        </div>


        
      </div>  

      <div className="w-full px-32 mt-10">
      <div className="flex gap-1">
            <p>نوع محتوا:</p>
            <p>{campaignNameValue}</p>
          </div>
      </div>
      
      <div className="w-full px-32 mt-10">
        <p>
            {ProductUsageValue}
        </p>
      </div>
    </div>
  );
};

export default CamapignDetail;
