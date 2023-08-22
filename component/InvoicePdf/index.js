import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useFarsi } from "../../helper/useFarsiDigits";

const InvoicePdf = () => {
  const [data, setData] = useState([]);
  const [itemData, setItemData] = useState();

  const router = useRouter();
  useEffect(() => {
    const createdeCampaign = localStorage.getItem("createdCampaign");
    axios
      .get(`${process.env.NEXT_PUBLIC_MAIN_URL_IMG}/v1/invoice/${createdeCampaign}`)
      .then((response) => {
        if (response.data) {
          setData(response.data[0]);
        }
        console.log("invoices", response.data);
      });
  }, []);

  useEffect(() => {
    if (data.items) {
      setItemData(JSON.parse(data?.items));
      console.log("JSON.parse(data?.items)", JSON.parse(data?.items));
    }
  }, [data]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-start py-5">
        <img src="/icons/security.svg" className="!w-[32px] !h-[32px]" />
        <h3 className=" text-[#001849] font-[500] text-[24px]">صورتحساب</h3>
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
              <p className="font-[400] text-[20px] text-[#001849]">{useFarsi(data?.date)}</p>
            </div>
          </div>

          <div className="mt-4 ">
            <div className="mt-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-start text-[14px] text-[#1B1B1F]">
                      شماره
                    </th>
                    <th className="px-4 py-2 text-start text-[14px] text-[#1B1B1F]">
                      نام
                    </th>
                    <th className="px-4 py-2 text-start text-[14px] text-[#1B1B1F]">
                      قیمت
                    </th>
                    <th className="px-4 py-2 text-start text-[14px] text-[#1B1B1F]">
                      تعداد
                    </th>
                    <th className="px-4 py-2 text-start text-[14px] text-[#1B1B1F]">
                      قیمت کل
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {itemData?.map((item, key) => (
                    <tr key={key} className="border-b">
                      <td className="px-4 py-4 text-start text-[14px] text-[#1B1B1F]">
                        {useFarsi(key + 1)}
                      </td>
                      <td className="px-4 py-2 text-start text-[14px] text-[#1B1B1F]">
                        {item.item_name}
                      </td>
                      <td className="px-4 py-2 text-start text-[12px] text-[#45464F]">
                        {useFarsi(item.item_price)}
                      </td>
                      <td className="px-4 py-2 text-start text-[12px] text-[#45464F]">
                        {useFarsi(item.item_oty)}
                      </td>
                      <td className="px-4 py-2 text-start text-[12px] text-[#45464F]">
                        {useFarsi(item.item_total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <div className="flex items-center px-16 mb-2 gap-x-2">
                <p className="text-[14px] text-[#1B1B1F] whitespace-nowrap">
                  جمع فرعی
                </p>
                <div className="w-full h-[40px] border-b flex items-center px-4 border-b-black rounded-[8px]">
                 <p className="w-full text-center text-[20px]"> {useFarsi(data?.amount)} ریال</p>
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
