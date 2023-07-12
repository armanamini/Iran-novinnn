import React, { useEffect, useState } from "react";
import CampaignLayout from "../../core/component/campaignLayout";
import axios from "axios";
import CampaignItems from "../../component/campaignItems";
import CampaignListItems from "../../component/campaignListItems";
import Link from "next/link";

const Campaign = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("https://api.adboost.dev/v1f/campaign-type").then((response) => {
      console.log(response.data);
      setData(response.data);
    });
  }, []);

  function getColor(index) {
    const colors = ["bg-red", "bg-blue", "bg-green"];
    return colors[index];
  }

  return (
    <CampaignLayout>
      <div className="bg-[#F1F2FD] h-screen p-10">
        <div className="p-10 bg-[#FBFBFF] rounded-[8px]">
          <div>
            <h2 className="text-center text-[28px]">نوع کمپین</h2>
            <p className="text-center text-[22px] pt-1">
              نوع کمپین را که می خواهید ایجاد کنید انتخاب کنید
            </p>
          </div>
          <div className="w-full pt-6">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {data?.slice(0, 3)?.map((item, index) => (
                <Link    key={index} href={`/campaign/campaignFlow/${item.id}`}>
                  <CampaignItems
                    icon={'Fa42Group'}
                    name={item.name}
                    description={item.description}
                    color={getColor(index)}
                  />
                </Link>
              ))}
            </div>
            
            <div className="flex flex-wrap items-start justify-start gap-2 pt-10">
              {data?.slice(3)?.map((item, index) => (
                <Link key={index} href={`/campaign/campaignFlow/${item.id}`}>
                  <CampaignListItems  name={item.name} />
                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>
    </CampaignLayout>
  );
};

export default Campaign;
