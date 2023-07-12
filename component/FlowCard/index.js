import React, { useEffect } from "react";

const FlowCard = ({ data }) => {
  useEffect(() => {
    console.log("data",JSON.parse(JSON.parse(data)[0].cfo_data));
  }, [data]);

  return (
    <div className="rounded-[16px] w-1/2 border p-10 border-[#DC3545]">
      <h3>{JSON.parse(JSON.parse(data)[0].cfo_data).name}</h3>
      <p>{JSON.parse(JSON.parse(data)[0].cfo_data).description}</p>
    </div>
  );
};

export default FlowCard;
