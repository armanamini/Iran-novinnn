import React, { useState } from "react";
import CampaignLayout from "../../core/component/campaignLayout";
import TicketTable from "../../core/component/Table/TicketTable";
import Link from "next/link";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";



const support = () => {
const [supportData,setSupportData] = useState()

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_MAIN_URL}ticket`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        console.log(response?.data);
        setSupportData(response?.data)
      })
      .catch((error) => {
        // toast.error(response.data.msg);
        console.error(error);
      });
  }, []);

  return (
    <CampaignLayout>
      <div className="flex items-center justify-between bg-[#FEFBFF] w-full p-20">
        <h3 className="text-[24px] text-[#001849]">پشتیبانی</h3>
        <div>
          <Link href="/support/createTicket">
            <button className="bg-[#00875A] px-4 py-2 flex items-center justify-center text-white rounded-[2px]">
              <img src="/icons/add.svg " className="!w-[24px]" />
              تیکت جدید
            </button>
          </Link>
        </div>
          </div>
        <div className="bg-[#FEFBFF]">
        <div>
          <TicketTable data={supportData}/>
        </div>
      </div>
    </CampaignLayout>
  );
};

export default support;
