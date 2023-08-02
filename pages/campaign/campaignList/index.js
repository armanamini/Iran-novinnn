import React, { useEffect, useState } from "react";
import Table from "../../../core/component/Table";
import CampaignLayout from "../../../core/component/campaignLayout";
import axios from "axios";
import Cookies from "js-cookie";

const index = () => {
  const [dataTable, setDataTable] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_MAIN_URL}campaign`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        setDataTable(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <div>
      <CampaignLayout>
        <div className="px-32 py-20">
          <Table data={dataTable} />
        </div>
      </CampaignLayout>
    </div>
  );
};

export default index;
