import React, { useEffect, useState } from "react";
import CampaignLayout from "../../core/component/campaignLayout";
import axios from "axios";
import CampaignItems from "../../component/campaignItems";
import CampaignListItems from "../../component/campaignListItems";
import Link from "next/link";

const Campaign = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_MAIN_URL}campaign-type`)
      .then((response) => {
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
      <div className="bg-[#FDFBFF] h-full min-h-screen mt-[1px]  p-10">
        <div className="p-10 sm:p-2 bg-[#FDFBFF] rounded-[8px]">
          <div>
            <h2 className="text-center text-[28px] font-[700]">نوع کمپین</h2>
            <p className="text-center text-[#757680] text-[22px] pt-1 font-[400]">
              نوع کمپین را که می خواهید ایجاد کنید انتخاب کنید
            </p>
          </div>
          <div className="w-full pt-14">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {data?.slice(0, 3)?.map((item, index) => (
                <Link
                  key={index}
                  href={`/campaign/campaignFlow/${item.id}?step=1`}
                >
                  <CampaignItems
                    icon={"Fa42Group"}
                    name={item.name}
                    description={item.description}
                    color={getColor(index)}
                  />
                </Link>
              ))}
            </div>

            <div className="grid items-center w-full grid-cols-12 pt-10 gap-y-4 gap-x-4">
              {data?.slice(3)?.map((item, index) => (
                <Link
                  className="w-full col-span-4 mx-auto xxxl:col-span-6 sm:col-span-12"
                  key={index}
                  href={`/campaign/campaignFlow/${item.id}?step=1`}
                >
                  <CampaignListItems key={index} name={item.name} />
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
