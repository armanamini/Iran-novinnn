import React, { useEffect, useState } from "react";
import CampaignLayout from "../../../core/component/campaignLayout";
import { useRouter } from "next/router";
import axios from "axios";
// import { Select, Tag } from "antd";
// import { LockFilled } from "@ant-design/icons";
import FlowCard from "../../../component/FlowCard";
import { toast } from "react-toastify";
// import { MultiSelect } from "react-multi-select-component";
import { Select } from "chakra-react-select";
import CampaignCards from "../../../component/mainFlowcampaignCards";
import ContentForm from "../../../component/ContentForm";
import InvoicePdf from "../../../component/InvoicePdf";
import CamapignDetail from "../../../component/campaignDetail";

const CampaignFlow = () => {
  const router = useRouter();
  const [flow, setFlow] = useState(1);
  const [data, setData] = useState();
  const [newItemState, setNewItemState] = useState();
  const [selected, setSelected] = useState([]);

  const [selectedValue, setSelectedValue] = useState();
  const [totalPrice, setTotalPrice] = useState();
  useEffect(() => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      if (key.includes("Selected card ID")) {
        console.log(`Value: ${value}`);
      }
    }

    if (typeof window !== "undefined") {
      const local = JSON.parse(localStorage.getItem("token"));

      if (local) {
        setNewItemState(local.fieldtypes);
      } else {
        toast.error("مقدار توکن معتبر نمی باشد");
      }
    }
  }, []);

  useEffect(() => {
    if (router.query.id) {
      axios
        .get(
          `https://api.adboost.dev/v1f/campaign-type/items?id=${router.query.id}`
        )
        .then((response) => {
          if (response.status == "200") {
            setData(response.data);
            console.log(response.data);
          } else {
            toast.error("no data");
          }
        });
    }
  }, [router.query]);

  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSelectChange = (e) => {
    setSelected(e);
    console.log("selectedValue", e);
  };

  const handleData = (e) => {
    setTotalPrice(e);
  };
  return (
    <div>
      <CampaignLayout>
        <div className="flex flex-col items-center justify-center">
          <div className="w-10/12 pt-10">
            <h1 className="mb-4 text-2xl font-bold text-black"></h1>
            <div
              className="p-10 w-full rounded-[8px] mt-10"
              style={{
                boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              {step == 1 && (
                <div className="relative grid grid-cols-12 gap-2 p-4 px-8 sm:px-2 md:px-4 lg:px-6">
                  {data?.campaignItems.map((item, index) => (
                    <CampaignCards
                      data={item}
                      key={item.id}
                      handleData={handleData}
                    />
                  ))}
                  <div className="absolute top-[100%]">
                    <p className="text-[23px]">مجموع: {totalPrice} تومان</p>
                  </div>
                </div>
              )}

              {step == 2 && (
                <div className="flex items-center justify-center w-full pb-4">
                  <ContentForm />
                </div>
              )}
              {step == 3 && (
                <div className="flex items-center justify-center w-full gap-4 pb-4 px-30">
                  <CamapignDetail totalPrice={totalPrice} />
                </div>
              )}
              {step == 4 && (
                <div className="flex items-center justify-center w-full gap-4 pb-4 px-30">
                  <InvoicePdf />
                </div>
              )}
            </div>
            <div className="flex items-end justify-end w-full gap-2 pt-3">
              {step !== 1 && (
                <button
                  className="px-4 py-2 font-bold border border-[#DC3545] bg-white rounded text-[#DC3545]"
                  onClick={handlePreviousStep}
                >
                  مرحله قبل
                </button>
              )}

              <button
                className="px-4 py-2 font-bold text-white rounded bg-[#DC3545]"
                onClick={handleNextStep}
              >
                ادامه
              </button>
            </div>
          </div>
        </div>
      </CampaignLayout>
    </div>
  );
};

export default CampaignFlow;
