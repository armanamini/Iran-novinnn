import React, { useEffect, useState } from "react";
import Table from "../../../core/component/Table";
import CampaignLayout from "../../../core/component/campaignLayout";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const index = () => {
  const [dataTable, setDataTable] = useState();
const router = useRouter()
useEffect(()=>{
  router.push(`/campaign/campaignList?page=1`)
},[])

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_MAIN_URL}campaign?page=${router.query.page||"1"}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        setDataTable(response.data);
      });
  }, [router.query.page]);





  return (
    <div>
      <CampaignLayout>
        <div className="px-32 py-20">
          <Table data={dataTable}/>
        </div>
      </CampaignLayout>
    </div>
  );
};

export default index;
