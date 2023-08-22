import React, { useEffect, useState } from "react";
import CampaignLayout from "../../../../core/component/campaignLayout";
import axios from "axios";
import { useRouter } from "next/router";

import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import ReportsTable from "../../../../component/reportsTable";
const EChartsComponent = dynamic(
  import("../../../../component/campaignChart"),
  {
    ssr: false,
  }
);

const reportDetail = () => {
  const [dataTableInfo, setDataTableInfo] = useState();
  const [chartData, setChartData] = useState();
  const [tableRow, setTableRow] = useState();
  const [headFields, setHeadFields] = useState();

  const router = useRouter();

  const dummyData = [
    { price: 50 },
    { price: 70 },
    { price: 85 },
    { price: 60 },
    { price: 90 },
    { price: 75 },
    // ... more data
  ];

  useEffect(() => {
    if (router.query.id) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_MAIN_URL}campaign/${router.query.id}/show-report`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        )
        .then((response) => {
          setChartData(response?.data);
          setHeadFields(response?.data.head_fields);
        });
    }
  }, [router.query.id]);

  useEffect(() => {
    if (chartData) {
      let arr = [];
      let arrRow = [];
      JSON.parse(chartData?.items)?.forEach((element) => {
        arrRow.push(element);
        setTableRow(arrRow);
        JSON.parse(element?.fields)?.forEach((item) => {
          arr.push(item);
          setDataTableInfo(arr);
        });
      });
    }
    console.log(chartData);
  }, [chartData]);

  return (
    <CampaignLayout>
      <div className="px-32 py-20">
        <div className="flex items-center justify-center">
           <EChartsComponent  chartData={chartData}/>
        </div>
        <p>{dataTableInfo?.name}</p>
        <ReportsTable data={dataTableInfo} row={tableRow} head={headFields} />
      </div>
    </CampaignLayout>
  );
};

export default reportDetail;
