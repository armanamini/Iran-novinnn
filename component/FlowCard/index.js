import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const FlowCard = ({ data, mainId, setStep, index, length }) => {
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [activeCard, setActiveCard] = useState(false);
  const router = useRouter();
  const [localData, setLocalData] = useState(
    JSON.parse(localStorage.getItem(`Selected card ID (${router.query.step})`))
  );
  const step = router.query.step;
  useEffect(() => {
    // console.log("localData",JSON.parse(localData?.split(":")[0]));
    setActiveCard(localData?.split(":")[1] == card.cfo_id);
  }, [activeCard]);
  useEffect(() => {
    if (data && data.length > 0) {
      console.log("data", JSON.parse(data)[0]);
    }
  }, [data]);

  const handleSelect = (cardId) => {
    setSelectedCardId(cardId);
    localStorage.setItem(
      `Selected card ID (${step})`,
      JSON.stringify(`${mainId.id}:${cardId}`)
    );
    setLocalData(
      JSON.parse(localStorage.getItem(`Selected card ID (${step})`))
    );

    console.log("Selected card ID:", cardId);

    if (index + 1 == length) {
      router.push(`/campaign/selectItems/${router.query.id}`);
    } else {
      router.push(
        `/campaign/campaignFlow/${router.query.id}?step=${+step + 1}`
      );
    }
  };

  if (!data || data.length === 0) {
    return null; // handles the case when data is empty
  }

  const card = JSON.parse(data)[0];
  console.log(mainId);
  const parsedData = JSON.parse(card.cfo_data);

  if (parsedData.img) {
    return (
      <div
        className={
          "rounded-[16px] w-[290px] flex flex-col items-center justify-between cursor-pointer min-h-[150px] px-10 py-10 !h-[294px] border-[#DC3545] border-[1px]"
        }
      >
        <img className="!w-[100px] !h-[100px]" src={parsedData.img} />
        <h3 className="w-full py-4 text-center">{parsedData.name}</h3>
        <button
          onClick={() => handleSelect(card.cfo_id)}
          className="bg-[#DC3545] py-2 px-4 w-full text-white"
        >
          انتخاب
        </button>
      </div>
    );
  } else if (parsedData.description) {
    return (
      <div
        className={
          "rounded-[16px] w-[290px] flex flex-col items-center justify-between cursor-pointer p-8 min-h-[150px] !h-[290px] border-[#DC3545] border-[1px]"
        }
      >
        <h3 className="w-full  text-center text-[24px]">{parsedData.name}</h3>
        <div className="py-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="258"
            height="2"
            viewBox="0 0 258 2"
            fill="none"
          >
            <path
              d="M0 1L258 1.00002"
              stroke="#AEABAB"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <p className="text-[#857370] min-h-[64px] ">
          {parsedData?.description}
        </p>
        <div className="w-full pt-6">
          <button
            onClick={() => handleSelect(card.cfo_id)}
            className="bg-[#DC3545] py-2 px-4 w-full text-white"
          >
            انتخاب
          </button>
        </div>
      </div>
    );
  } else {
    // Default case
    return null;
  }
};

export default FlowCard;
