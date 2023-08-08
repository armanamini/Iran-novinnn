import React, { useEffect, useState } from "react";
import { useFarsi } from "../../helper/useFarsiDigits";
import config from "../../data/config.json";

const CampaignCards = ({ data, handleData }) => {
  const [handleId, setHandleId] = useState([data.id]);
  const [arr, setArr] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [propertyName, setPropertyName] = useState(config[0]?.propertyName);
  const [propertyName2, setPropertyName2] = useState(config[0]?.propertyName2);

  const handleClicked = (e) => {
    const storedItems = localStorage?.getItem("items");
    let updatedItems = [];

    if (storedItems) {
      updatedItems = JSON.parse(storedItems);
    }

    if (updatedItems.includes(e)) {
      updatedItems = updatedItems.filter((item) => item !== e);
    } else {
      updatedItems.push(e);
    }

    setArr(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));

    const storedPrices = localStorage?.getItem("prices");
    let updatedPrices = {};

    if (storedPrices) {
      updatedPrices = JSON.parse(storedPrices);
    }

    if (updatedItems.includes(e)) {
      updatedPrices[e] = data.price;
    } else {
      delete updatedPrices[e];
    }

    localStorage.setItem("prices", JSON.stringify(updatedPrices));

    setHandleId((prevHandleId) => [...prevHandleId, e]);
  };

  useEffect(() => {
    const storedPrices = localStorage?.getItem("prices");
    if (storedPrices) {
      const prices = JSON.parse(storedPrices);
      const totalPrice = Object.values(prices)?.reduce(
        (acc, curr) => acc + curr,
        0
      );
      setTotalPrice(totalPrice);

      handleData(totalPrice);
    }
  }, [handleId]);

  const storedItems = localStorage.getItem("items");
  let updatedItems = [];

  if (storedItems) {
    updatedItems = JSON.parse(storedItems);
  }

  const isItemSelected = updatedItems.includes(data.id);
  return (
    <div
      class={
        "relative border rounded-[4px] col-span-4  md:col-span-6 mx-auto sm:col-span-12  w-full"
      }
    >
      <div class="relative inline-block w-full">
        <div class="shadow p-4 rounded-[4px] bg-white">
          <div class="flex justify-center relative rounded-lg overflow-hidden h-[80%] w-[80%]">
            <div class="absolute w-full inset-0 rounded-[50%] bg-black opacity-10 border border-gray-950"></div>
          </div>

          <div class="px-4 pt-4">
            <p class="mt-2 text-[16px] font-[500] text-gray-800 line-clamp-1">
              {data?.name}
            </p>
          </div>

          <div className="pt-4">
            <div className="flex items-center justify-between px-4">
              <img src={data?.primary_image ?data?.primary_image : "/icons/profile.svg"} className="!w-[64px] !h-[64px] rounded-[50%]" />
              <div className="flex flex-col items-center justify-center">
                <p className="text-[22px] font-[600] ">
                  {useFarsi(data[propertyName])}
                </p>
                <span className="text-[#00000073] text-[14px] block font-[600]">
                  امتیاز
                </span>
              </div>

              <div>
                <p className="text-[22px] font-[600]">
                  {useFarsi(data[propertyName2])}
                </p>
                <span className="text-[#00000073] text-[14px] block font-[600]">
                  فالوورها
                </span>
              </div>
            </div>

            <div className="flex flex-col px-4 pt-2">
              <p className="text-[16px] font-[500] ltr text-end">
                {" "}
                {data?.name}
              </p>
              <span className="block text-[14px] font-[600] text-[#FF4004]">
                برنامه نویسی
              </span>
              <span className="block text-[#BFBFBF] font-[500] ">
                ویو استوری
              </span>
            </div>
          </div>

          <div class="grid grid-cols-2 grid-rows-2 gap-x-4 mt-4 pb-5">
            <div class="flex items-center border p-2 border-[#1890FF] rounded-[4px] ">
              <p class="ml-2 text-[#1890FF] text-center w-full line-clamp-1 ">
                قوانین{" "}
              </p>
            </div>
            <div class="flex items-center border border-[#52C41A] p-2 rounded-[4px] ">
              <p class="ml-2 text-[#52C41A] text-center w-full line-clamp-1">
                {data?.fq_used}
                بار انتخاب شده
              </p>
            </div>
          </div>

          <div className="absolute left-0 w-full h-[1px] bg-[#00000040] bottom-[5rem]"></div>

          <div class="grid grid-cols-2 ">
            <div class="flex justify-start p-2">
              <p class="inline-block font-semibold  text-primary whitespace-nowrap leading-tight rounded-xl">
                <span class="text-lg ml-1">{useFarsi(data?.price)}</span>
                <span class="text-sm uppercase">تومان</span>
              </p>
            </div>

            <div
              onClick={() => handleClicked(data.id)}
              class={
                isItemSelected
                  ? "cursor-pointer flex items-center border border-[#DC3545] bg-[#DC3545] rounded-[4px]"
                  : "cursor-pointer flex items-center border border-[#DC3545] rounded-[4px]"
              }
            >
              <p
                class={
                  isItemSelected
                    ? " text-white text-center w-full line-clamp-1 "
                    : " text-[#DC3545] text-center w-full line-clamp-1"
                }
              >
                {isItemSelected ? "انتخاب شده" : "انتخاب"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCards;
