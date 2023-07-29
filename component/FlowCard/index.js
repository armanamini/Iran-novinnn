import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const FlowCard = ({ data,mainId }) => {
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [activeCard, setActiveCard] = useState(false);
  const router = useRouter();
  const [localData, setLocalData] = useState(
    JSON.parse(localStorage.getItem(`Selected card ID (${router.query.step})`))
  );
  const step = router.query.step;

  useEffect(() => {
    if (data && data.length > 0) {
      console.log("data", JSON.parse(data)[0]);
    }
  }, [data]);

  const handleSelect = (cardId) => {
    setSelectedCardId(cardId);
    localStorage.setItem(`Selected card ID (${step})`, JSON.stringify(`${mainId.id}:${cardId}`));
    setLocalData(
      JSON.parse(localStorage.getItem(`Selected card ID (${step})`))
    );

    console.log("Selected card ID:", cardId);
  };

  if (!data || data.length === 0) {
    return null; // handles the case when data is empty
  }
  useEffect(() => {
    // console.log("localData",JSON.parse(localData?.split(":")[0]));
    setActiveCard(localData?.split(":")[1] == card.cfo_id);
  }, [activeCard, handleSelect]);
  const card = JSON.parse(data)[0];
   console.log(mainId);
  return (
    <div
      className={
        activeCard
          ? "rounded-[16px] w-[200px] cursor-pointer p-10 h-[150px] border-[#DC3545] border-[3px]"
          : "rounded-[16px] w-[200px] cursor-pointer p-10 h-[150px] border-[#DC3545] border-[1px]"
      }
      onClick={() => handleSelect(card.cfo_id)}
    >
      <h3>{JSON.parse(card.cfo_data)?.name}</h3>
      
      <p>{JSON.parse(card.cfo_data)?.description}</p>
    </div>
  );
};

export default FlowCard;
