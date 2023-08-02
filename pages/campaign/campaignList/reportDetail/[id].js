import React, { useEffect, useState } from "react";
import CampaignLayout from "../../../../core/component/campaignLayout";
import axios from "axios";
import { useRouter } from "next/router";
import Table from "../../../../core/component/Table";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
const EChartsComponent = dynamic(
  import("../../../../component/campaignChart"),
  {
    ssr: false,
  }
);
const reportDetail = () => {
  const [dataTableInfo, setDataTableInfo] = useState();
  const [chartData, setChartData] = useState();
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_MAIN_URL}campaign/${router.query.id}/reports`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        )
        .then((response) => {
          setDataTableInfo(response.data);
          setChartData(response?.data.balance);
          console.log("response.data", response);
        });
    }
  }, [router.query]);

  return (
    <CampaignLayout>
      <div className="px-32 py-20">
        <div className="flex items-center justify-center">
          <EChartsComponent data={chartData} />
        </div>
        <p>{dataTableInfo?.name}</p>
        <Table data={dataTableInfo} />
      </div>
    </CampaignLayout>
  );
};

export default reportDetail;
