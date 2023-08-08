import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const InvoicePdf = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const createdeCampaign = localStorage.getItem("createdCampaign");
    axios
      .get(`https://rest.adboost.dev/v1/invoice/${createdeCampaign}`)
      .then((response) => {
        if (response.data) {
          setData(response.data);
        }
        console.log("invoices", response.data);
      });
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center justify-start py-5">
        <img src="/icons/security.svg" className="!w-[32px] !h-[32px]" />
        <h3 className=" text-[#001849] font-[500] text-[24px]">جزئیات کمپین</h3>
      </div>
      <div
        className="w-[40%] mx-auto mt-8 bg-[#FEFBFF] rounded-[4px]"
        style={{
          boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="max-w-[50rem] bg-[#fff] rounded-[16px] p-4 px-6 mx-auto  h-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <div className="mt-6 border-b border-[#C5C6D0] pb-6">
            <div className=" flex items-center justify-between gap-x-1 font-[400] text-[#001849]">
              {" "}
              <p className="font-[400] text-[20px] text-[#001849]">صورتحساب</p>
              <p className="font-[400] text-[20px] text-[#001849]">140/11/11</p>
            </div>
          </div>

          <div className="mt-4 ">
            <div className="flex px-4  border-b pb-5 border-[#C5C6D0]  items-center justify-between">
              <div className="flex items-center gap-x-24">
                <p className="text-[14px] text-[#1B1B1F]">شماره</p>
                <p className="text-[14px]  text-[#1B1B1F]">موضوع</p>
              </div>
              <div className="flex items-center gap-x-24">
                <p className="text-[14px] text-[#1B1B1F] ml-6">قیمت</p>
                <p className="text-[14px] text-[#1B1B1F]">جمع</p>
              </div>
            </div>

            <div className="flex px-4 mt-6 border-b pb-5 border-[#C5C6D0]  items-center justify-between">
              <div className="flex items-center gap-x-24">
                <p className="text-[14px] text-[#1B1B1F]">1</p>
                <p className="text-[14px] w-[40%] text-[#1B1B1F]">
                  {data.length > 0 && data[0]?.item_name}
                </p>
              </div>
              <div className="flex items-center gap-x-24">
                <p className="text-[12px] text-[##45464F]">
                  {data.length > 0 && data[0]?.item_price}
                </p>
                <p className="text-[12px] text-[##45464F]">
                  {data.length > 0 && data[0]?.item_total}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center px-16 mb-2 gap-x-2">
                <p className="text-[14px] text-[#1B1B1F] whitespace-nowrap">
                  جمع فرعی
                </p>
                <div className="w-full h-[40px] border-b flex items-center px-4 border-b-black rounded-[8px]">
                  {data.length > 0 && data[0]?.amount} ریال
                </div>
              </div>

              <button
                className="bg-[#DC3545] mt-4 w-full py-3 text-white rounded-[8px]"
                onClick={() => {
                  router.push("/campaign/campaignList");
                }}
              >
                پرداخت
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePdf;
