import React, { useEffect, useState } from "react";


const CampaignCards = ({ data, handleData }) => {
  const [handleId, setHandleId] = useState([data.id]);
  const [arr, setArr] = useState([]);
  const [totalPrice, setTotalPrice] = useState();


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
if(storedPrices){

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
  useEffect(()=>{
console.log('daaaaaaaaata',data);
  },[data])
  
  const isItemSelected = updatedItems.includes(data.id);
  return (
    <div
      class={
        isItemSelected
          ? "relative col-span-3 lg:col-span-4 md:col-span-6 sm:col-span-12 border mx-auto border-black w-full rounded-[4px]"
          : "relative border col-span-3 lg:col-span-4 md:col-span-6 mx-auto sm:col-span-12  rounded-[4px] w-full"
      }
      onClick={() => handleClicked(data.id)}
    >
      <div class="relative cursor-pointer inline-block duration-300 ease-in-out transition-transform transform hover:-translate-y-2 w-full">
        <div class="shadow p-4 rounded-lg bg-white">
          <div class="flex justify-center relative rounded-lg overflow-hidden h-[80%] w-[80%]">
            <div class="absolute w-full inset-0 rounded-[50%] bg-black opacity-10 border border-gray-950"></div>
          </div>

          <div class="mt-4">
            <p
              class="mt-2 text-sm text-gray-800 line-clamp-1"
              title="New York, NY 10004, United States"
            >
              {data?.name}
            </p>
          </div>

          <div class="grid grid-cols-2 grid-rows-2 gap-4 mt-4">
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

          <div class="grid grid-cols-2">
            <div class="flex justify-start p-2">
              <p class="inline-block font-semibold  text-primary whitespace-nowrap leading-tight rounded-xl">
                <span class="text-lg ml-1">{data?.price}</span>
                <span class="text-sm uppercase">تومان</span>
              </p>
            </div>

            <div class="flex items-center border border-[#DC3545] rounded-[4px]">
              <p class="ml-2 text-gray-800 text-center w-full line-clamp-1">
                انتخاب{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCards;
