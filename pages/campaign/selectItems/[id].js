import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import CampaignLayout from "../../../core/component/campaignLayout";
import CampaignCards from "../../../component/mainFlowcampaignCards";
import ContentForm from "../../../component/ContentForm";
import InvoicePdf from "../../../component/InvoicePdf";
import CamapignDetail from "../../../component/campaignDetail";
import { Switch } from "antd";
import CustomSelect from "../../../component/CusotmSelect";
import CustomSelectCategory from "../../../component/CustomSelectCategory";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import SwiperITems from "../../../component/SwiperSelectItem";
import { useFarsi } from "../../../helper/useFarsiDigits";

const CampaignFlow = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selected, setSelected] = useState([]);
  const [newItemState, setNewItemState] = useState();
  const [range, setRange] = useState([25, 75]); // Set initial range here

  function log(value) {
    console.log(value); //eslint-disable-line
  }

  const handleChange = (value) => {
    setRange(value);
  };
  const onChange = (value) => {
    console.log("onChange: ", value);
  };
  const onAfterChange = (value) => {
    console.log("onAfterChange: ", value);
  };

  useEffect(() => {
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
          `${process.env.NEXT_PUBLIC_MAIN_URL}campaign-type/items?id=${router.query.id}`
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

  const handleNextStep = useCallback(() => {
    setStep(step + 1);
  }, [step]);

  const handlePreviousStep = useCallback(() => {
    setStep(step - 1);
  }, [step]);

  const handleSelectChange = useCallback((e) => {
    setSelected(e);
    console.log("selectedValue", e);
  }, []);

  const handleData = useCallback((e) => {
    setTotalPrice(e);
  }, []);

  const StepOneComponent = () => {
    return (
      <div className="grid grid-cols-12">
        <div className="col-span-3 mt-10 ">
          <div className="ml-auto w-[90%] bg-white h-full">
            <div className="flex p-4 pt-10 gap-x-4">
              <Switch defaultChecked className="bg-[#8C8C8C]" />
              <p className="text-[16px] font-semibold">فقط انتخاب شده ها</p>
            </div>

            <div className="flex p-4 gap-x-4">
              <Switch defaultChecked className="bg-[#8C8C8C]" />
              <p className="text-[16px] font-semibold">فقط مناسب شما</p>
            </div>

            <div className="flex p-4 gap-x-4">
              <Switch defaultChecked className="bg-[#8C8C8C]" />
              <p className="text-[16px] font-semibold">دارای اینسایت</p>
            </div>

            <div className="mt-4 ">
              <CustomSelect label="نوع استوری" />
            </div>
            <div className="mt-4">
              <CustomSelectCategory label="دسته بندی ها" />
            </div>
            <div>
              <div className="px-4 py-10 ">
                <p className="pb-3">بازه قیمت (تومان)</p>

                <Slider
                  range
                  dotStyle={{
                    width: "50px",
                  }}
                  trackStyle={{
                    height: "6px",
                  }}
                  handleStyle={{
                    height: "16px",
                    width: "16px",
                  }}
                  allowCross={false}
                  defaultValue={[0, 20]}
                  onChange={log}
                />
                <div>
                  <p className="text-end text-[#00000040]">100 میلیون</p>
                </div>
                <div className="w-full text-[#00000040] ">از 2000 تا 40000</div>
              </div>

              <div className="px-4">
                <p className="pb-3">بازه قیمت (تومان)</p>

                <Slider
                  range
                  dotStyle={{
                    width: "50px",
                  }}
                  trackStyle={{
                    height: "6px",
                  }}
                  handleStyle={{
                    height: "16px",
                    width: "16px",
                  }}
                  allowCross={false}
                  defaultValue={[0, 20]}
                  onChange={log}
                />
                <div>
                  <p className="text-end text-[#00000040]">100 میلیون</p>
                </div>
                <div className="w-full text-[#00000040]">از 2000 تا 40000</div>
              </div>

              <div className="flex flex-col items-start justify-start px-4 mt-10">
                <p className="p-2">نوع تعرفه</p>
                <div className="flex items-center justify-center gap-3 p-2">
                  <input
                    type="checkbox"
                    className="w-5 h-5 form-checkbox !outline-[#D9D9D9]"
                  />
                  <span className="text-[#00000040]">کسب و کار</span>
                </div>
                <div className="flex items-center justify-center gap-3 p-2">
                  <input
                    type="checkbox"
                    className="w-5 h-5 form-checkbox !outline-[#D9D9D9]"
                  />
                  <span className="text-[#00000040]">کسب و کار</span>
                </div>
                <div className="flex items-center justify-center gap-3 p-2">
                  <input
                    type="checkbox"
                    className="w-5 h-5 form-checkbox !outline-[#D9D9D9]"
                  />
                  <span className="text-[#00000040]">کسب و کار</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.25)",
          }}
          className="col-span-9 b  w-full rounded-[8px] mt-10"
        >
          <div className="relative grid grid-cols-12 gap-2 p-4 px-8 sm:px-2 md:px-4 lg:px-6">
            {data?.campaignItems?.map((item, index) => (
              <CampaignCards
                data={item}
                key={item.id}
                handleData={handleData}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto ">
      <CampaignLayout>
        <div className="bg-[#FEFBFF] h-full min-h-screen">
          <div className="flex flex-col items-center justify-center mt-2 h-max">
            <div className="w-11/12 pt-5">
              {step == 1 && (
                <>
                  <h1 className="mb-4 text-[24px] font-bold text-[#001849]">
                    پیشنهادها
                  </h1>
                  <div className="px-0 py-4 bg-red-300">
                    <SwiperITems data={data?.campaignItems} />
                  </div>
                  <StepOneComponent />
                </>
              )}

              {step == 2 && (
                <>
                  <div className="flex items-start gap-1 ">
                    <img src="/icons/security.svg" className="!w-[32px]" />
                    <h1 className="mb-4 text-[24px] font-bold text-[#001849]">
                      محتوا
                    </h1>
                  </div>

                  <div className="flex items-center justify-center w-full pb-4">
                    <ContentForm />
                  </div>
                </>
              )}
              {step == 3 && (
                <div className="flex items-center justify-center w-full gap-4 pb-4 px-30">
                  <CamapignDetail
                    totalPrice={totalPrice}
                    step={true}
                    setStep={(e) => {
                      setStep(4);
                    }}
                  />
                </div>
              )}
              {step == 4 && (
                <div className="flex items-center justify-center w-full gap-4 pb-4 px-30">
                  <InvoicePdf />
                </div>
              )}

              <div className="flex items-end justify-end w-full gap-2 pt-3">
                {step != 1 && step != 3 && (
                  <button
                    className="px-4 py-2 font-bold border border-[#DC3545] bg-white rounded text-[#DC3545]"
                    onClick={handlePreviousStep}
                  >
                    مرحله قبل
                  </button>
                )}

                {step != 3 && (
                  <div
                    className={
                      step == 1
                        ? "flex flex-row-reverse w-full border-t-[2px] py-4"
                        : "flex"
                    }
                  >
                    <button
                      className="px-4 py-2 font-bold text-white rounded bg-[#DC3545]"
                      onClick={handleNextStep}
                    >
                      ادامه
                    </button>
                    {step == 1 && (
                      <div className="w-full ">
                        <p className="text-[23px]">
                          مجموع: {useFarsi(totalPrice)} تومان
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CampaignLayout>
    </div>
  );
};

export default CampaignFlow;
