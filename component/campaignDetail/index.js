import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineCalculator } from "react-icons/ai";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormData from "form-data";
import { useFarsi } from "../../helper/useFarsiDigits";

const CamapignDetail = ({ totalPrice, step, setStep, arrBanner }) => {
  const filledData = useSelector((state) => state.input);
  const textareaValue = filledData.textareaValue;
  const parentId = filledData.parentId;
  const typeId = filledData.typeId;
  const campaignNameValue = filledData.campaignNameValue;

  const ProductUsageValue = filledData.ProductUsageValue;
  const totalPriceOfItemsValue = filledData.totalPriceOfItemsValue;
  const fileValue = filledData.fileValue;
  const startDate = filledData.startDate;
  const endDate = filledData.endDate;

  console.log("fileValue", campaignNameValue);

  const [cards, setCard] = useState();
  const [dataMultuple, setDataMultiple] = useState();
  const [dataSignle, setDataSingle] = useState();
  const router = useRouter();

  const dataOfInputs = {
    textareaValue: textareaValue,
    parentId: parentId,
    typeId: typeId,
  };

  console.log("textareaValue", {
    [dataOfInputs.parentId]: JSON.stringify(dataOfInputs),
  });

  useEffect(() => {
    const arrayData = [];
    const arrayDataMultiple = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);

      if (key.includes("Selected card ID")) {
        arrayData.push(value);
        setCard(arrayData);
      }

      if (key.includes("customFileds")) {
        arrayDataMultiple.push(value);
        setDataMultiple(arrayDataMultiple);
      }

      if (key.includes("single select")) {
        console.log(value);
        setDataSingle(JSON.parse(value));
      }
    }
  }, [step]);

  const handleSubmitForm = () => {
    const items = JSON.parse(localStorage.getItem("items"));

    const serverData = {};

    items?.forEach((item) => {
      const optionsData = item.options.map((option) => ({
        name: option.name,
        price: option.price,
      }));

      serverData[item.id] = {
        oty: item.quantity,
        extra_option_price: optionsData.map((option) => option.name),
      };
    });

    const key2 = cards?.map((item) => {
      const key2 = JSON.parse(item.split(":")).split(",")[0];
      return key2;
    });

    const key3 = dataMultuple?.map((item) => {
      console.log(JSON.parse(item)[0]);
      const key3 = JSON.parse(item)[0].mainCustomFiledId;
      return key3;
    });

    const values3 = dataMultuple?.map((item) => {
      const value3 = JSON.parse(item);
      const main = value3.map((items) => {
        return items.selectedid;
      });

      return main;
    });

    const custom_fields = {
      ...key2?.reduce((acc, key, index) => {
        const value2 = parseInt(cards[index].split(":")[1]);
        return { ...acc, [key]: [value2] };
      }, {}),

      ...key3?.reduce((acc, key, index) => {
        const value3 = values3[index];
        return { ...acc, [key]: value3 };
      }, {}),
      [dataSignle?.parentId]: [dataSignle?.id],
      [dataOfInputs.parentId]: JSON.stringify(dataOfInputs),
      [dataOfInputs.parentId]: JSON.stringify({
        startDate: startDate,
        endDate: endDate,
      }),
    };

    const formData = new FormData();

    formData.append("title", campaignNameValue[0]);
    formData.append("type_id", router.query.id);
    formData.append("balance", totalPriceOfItemsValue);
    formData.append("payment_status", 0);
    formData.append("item_ids", JSON.stringify(serverData));
    formData.append("custom_fields", JSON.stringify(custom_fields));

    formData.append(`image`, arrBanner); // Use a unique identifier for each file

    console.log("arrBanner", arrBanner);

    axios
      .post(`${process.env.NEXT_PUBLIC_MAIN_URL}campaign`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file upload
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        if (response.data.success == true) {
          toast.success(response.data.msg);
          setStep(4);
          localStorage.setItem("createdCampaign", response?.data[0].invoice_id);
        } else if (response.data.success === false) {
          toast.error(response.data.msg);
          console.log(response?.data);
        }
      })
      .catch((error) => {
        // toast.error(response.data.msg);
        console.error(error);
      });
  };
  const Campaign_type = JSON.parse(localStorage.getItem("token"))
    .campaign_type_mode[JSON.parse(localStorage.getItem("campaign-type"))];

  return (
    <div className="w-full">
      <div className="flex items-center justify-start py-5">
        <img src="/icons/security.svg" className="!w-[32px] !h-[32px]" />
        <h3 className=" text-[#001849] font-[500] text-[24px]">جزئیات کمپین</h3>
      </div>

      <div
        className="w-full p-10 rounded-[4px] bg-white "
        style={{
          boxShadow: " 0px 4px 12px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="w-[100%] flex">
          <div className="w-1/2 pr-10">
            <div className="w-full">
              <div className="flex flex-col items-center justify-between w-full gap-y-7">
                <div className="flex w-full gap-1">
                  <p className="text-[#777777] text-[14px] font-[600]">
                    نام کمپین:
                  </p>
                  <p className="text-[14px] text-[#000000] font-[600]">
                    {campaignNameValue[1]}
                  </p>
                </div>
                <div className="flex w-full gap-2 text-start">
                  <p className="text-[#777777] text-[14px] font-[600]">
                    تاریخ شروع و پایان:
                  </p>
                  <p className="text-[14px] text-[#000000] font-[500]">
                    {startDate}
                  </p>
                  <span>تا</span>
                  <p className="text-[14px] text-[#000000] font-[500]">
                    {endDate}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full mt-7">
              <div className="flex flex-col items-center justify-between w-full gap-y-7">
                {/* <div className="flex w-full gap-1">
                  <p className="text-[#777777] text-[14px] font-[600]">
                    شبکه اجتماعی:
                  </p>
                  <p className="text-[14px] text-[#000000] font-[500]">
                    {campaignNameValue}
                  </p>
                </div> */}
                <div className="flex w-full gap-1 text-start">
                  <p className="text-[#777777] text-[14px] font-[600]">
                    نوع کمپین:
                  </p>
                  <p className="text-[14px] text-[#000000] font-[600]">
                    {Campaign_type}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full mt-7">
              <div className="flex flex-col items-center justify-between w-full gap-y-7">
                <div className="flex w-full gap-1">
                  <p className="text-[#777777] text-[14px] font-[600]">
                    موضوع:
                  </p>
                  <p className="text-[14px] text-[#000000] font-[600]">
                    {campaignNameValue}
                  </p>
                </div>
                <div className="flex w-full gap-1 text-start">
                  <p className="text-[#777777] text-[14px] font-[600]">
                    مبلغ کل:
                  </p>
                  <p className="text-[14px] text-[#000000] font-[600]">
                    {useFarsi(totalPriceOfItemsValue)}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full mt-7">
              <div className="flex gap-1">
                <p className="text-[#777777] text-[14px] font-[600]">
                  نوع محتوا:
                </p>
                <p className="text-[14px] text-[#000000] font-[500]">
                  {/* {localStorage.getItem("campaign-type")} */}
                </p>
              </div>
            </div>
          </div>

          <div className="w-1/2 pl-10">
            {fileValue && (
              <img
                src={URL.createObjectURL(fileValue)}
                className="!w-[177px] !h-[344px] float-left rounded-[10px]"
              />
            )}
          </div>
        </div>

        <div className="w-full h-[1px] mt-10 bg-[#999999]"></div>
        <div className="flex items-center justify-start gap-2 pt-5">
          <img
            src="/images/Frame 26085853.png"
            className="!w-[48px] !h-[48px]"
          />
          <div>
            <h3 className="mb-1 text-[14px] font-[600]">آرمان امینی</h3>
            <p className="text-[#8F909A] text-[14px]">7.900.000</p>
          </div>
        </div>
        <span className="text-[#DC3545] text-[14px] pt-4 block">
          ۱۰٪ هزینه مدیریت کمپین
        </span>
        <p className="pt-2 pb-4 text-[14px]">
          قیمت‌ها طبق آخرین تعرفه دریافت شده از صاحبان پیج نوشته شده است و ممکن
          است برای اجرای کمپین تا ۱۰٪ تغییر کند.
        </p>

        <div className="w-full pl-64 text-[14px] leading-6">
          <p>{ProductUsageValue}</p>
        </div>

        <div className="flex items-center justify-end w-full gap-2 mt-10 ">
          <button
            className="px-4 py-2 font-bold border border-[#DC3545] bg-white rounded text-[#DC3545]"
            onClick={() => setStep((prev) => prev - 1)}
          >
            مرحله قبل
          </button>
          <button
            className="bg-[#DC3545] text-white px-4 h-[40px] rounded-[2px]"
            onClick={handleSubmitForm}
          >
            تایید و ساخت کمپین
          </button>
        </div>
      </div>
    </div>
  );
};

export default CamapignDetail;
