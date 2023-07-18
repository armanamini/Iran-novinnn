import React from "react";

const InvoicePdf = () => {
  return (
    <div className=" h-screen mt-8 bg-[#FEFBFF] ">
      <div className="max-w-[50rem]  bg-[#fff] rounded-[16px] p-4 px-6 mx-auto  h-auto">
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

        <div className="flex border-b pb-3 border-[#C5C6D0] mt-8 items-center justify-between">
          <p className="text-[20px] font-[500px]">صورت حساب</p>
          <p className="text-[20px] font-[500px] ">1402/12/12</p>
        </div>

        <div className="flex mt-8 border-b pb-3 border-dashed border-[#C5C6D0] items-center">
          <p className="basis-[50%] text-[22px] font-[600] font-san text-[#1B1B1F]">
            FROM
          </p>
          <p className="basis-[50%] text-[22px] font-[600] font-san text-[#1B1B1F]">
            TO
          </p>
        </div>

        <div className="flex mt-8 border-b pb-1  border-[#C5C6D0] items-center">
          <div className="basis-[50%]  ">
            <p className="mb-1 text-[22px] font-[400] text-[#303034]">
              شرکت من
            </p>
            <p className="mb-1 text-[#77767A] text-[16px] font-san">
              {" "}
              2022 DevGrow Lane
            </p>
            <p className="mb-1 text-[#77767A] text-[16px] font-san ">
              {" "}
              تهران، ایران
            </p>
          </div>
          <div className="basis-[50%]  ">
            <p className="mb-1 text-[22px] font-[400] text-[#303034]">
              شرکت شما
            </p>
            <p className="mb-1 text-[#77767A] text-[16px] font-san">
              {" "}
              2022 DevGrow Lane
            </p>
            <p className="mb-1 text-[#77767A] text-[16px] font-san ">
              {" "}
              تهران، ایران
            </p>
          </div>
        </div>

        <div className="mt-6 border-b border-[#C5C6D0] pb-6">
          <div className=" flex items-center gap-x-1 font-[400] text-[#001849]">
            {" "}
            <p className="font-[400] text-[20px] text-[#001849]">
              شماره فاکتور :{" "}
            </p>
            <p className="font-[400] text-[20px] text-[#001849]">123</p>
          </div>
        </div>

        <div className="mt-4 ">
          <div className="flex px-4  border-b pb-5 border-[#C5C6D0]  items-center justify-between">
            <div className="flex items-center gap-x-24">
              <p className="text-[14px] text-[#1B1B1F]">شماره</p>
              <p className="text-[14px] text-[#1B1B1F]">موضوع</p>
            </div>
            <div className="flex items-center gap-x-24">
              <p className="text-[14px] text-[#1B1B1F] ml-6">قیمت</p>
              <p className="text-[14px] text-[#1B1B1F]">جمع</p>
            </div>
          </div>

          <div className="flex px-4 mt-6 border-b pb-5 border-[#C5C6D0]  items-center justify-between">
            <div className="flex items-center gap-x-24">
              <p className="text-[14px] text-[#1B1B1F]">1</p>
              <p className="text-[14px] text-[#1B1B1F]">تبلیغات اینستا گرام</p>
            </div>
            <div className="flex items-center gap-x-24">
              <p className="text-[12px] text-[##45464F]">1/000/000</p>
              <p className="text-[12px] text-[##45464F]">2/000/000</p>
            </div>
          </div>

          <div className="flex px-4 mt-6 border-b pb-5 border-[#C5C6D0]  items-center justify-between">
            <div className="flex items-center gap-x-24">
              <p className="text-[14px] text-[#1B1B1F]">2</p>
              <p className="text-[14px] text-[#1B1B1F]">تبلیغات بنری</p>
            </div>
            <div className="flex items-center gap-x-24">
              <p className="text-[12px] text-[##45464F]">1/000/000</p>
              <p className="text-[12px] text-[##45464F]">2/000/000</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center px-16 mb-2 gap-x-2">
              <p className="text-[14px] text-[#1B1B1F] whitespace-nowrap">
                جمع فرعی
              </p>
              <div className="w-full h-[40px] border flex items-center px-4 border-[#C5C6D0] bg-[#FEFBFF] rounded-[8px]">
                <p className="text-[#45464F] text-[14px]">10000 ریال</p>
              </div>
            </div>

            <div className="flex items-center px-16 mb-2 gap-x-2">
              <p className="text-[14px] text-[#1B1B1F] whitespace-nowrap">
                جمع فرعی
              </p>
              <div className="w-full h-[40px] border flex items-center px-4 border-[#C5C6D0] bg-[#FEFBFF] rounded-[8px]">
                <p className="text-[#45464F] text-[14px]">10000 ریال</p>
              </div>
            </div>
            <div className="flex items-center px-16 mb-2 gap-x-2">
              <p className="text-[14px] text-[#1B1B1F] whitespace-nowrap">
                جمع فرعی
              </p>
              <div className="w-full h-[40px] border flex items-center px-4 border-[#C5C6D0] bg-[#FEFBFF] rounded-[8px]">
                <p className="text-[#45464F] text-[14px]">10000 ریال</p>
              </div>
            </div>
            <div className="flex items-center px-16 mb-2 gap-x-2">
              <p className="text-[14px] text-[#1B1B1F] whitespace-nowrap">
                جمع فرعی
              </p>
              <div className="w-full h-[40px] border flex items-center px-4 border-[#C5C6D0] bg-[#FEFBFF] rounded-[8px]">
                <p className="text-[#45464F] text-[14px]">10000 ریال</p>
              </div>
            </div>
            <div className="flex items-center px-16 mb-2 gap-x-2">
              <p className="text-[14px] text-[#1B1B1F] whitespace-nowrap">
                جمع فرعی
              </p>
              <div className="w-full h-[40px] border flex items-center px-4 border-[#C5C6D0] bg-[#FEFBFF] rounded-[8px]">
                <p className="text-[#45464F] text-[14px]">10000 ریال</p>
              </div>
            </div>

            <button className="bg-[#DC3545] mt-4 w-full py-3 text-white rounded-[8px]">
              پرداخت
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePdf;