import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineCalculator } from "react-icons/ai";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CamapignDetail = ({ totalPrice, step, setStep }) => {
  const filledData = useSelector((state) => state.input);
  const textareaValue = filledData.textareaValue;
  const campaignNameValue = filledData.campaignNameValue;
  const campaignStartTimeValue = filledData.campaignStartTimeValue;
  const ProductUsageValue = filledData.ProductUsageValue;
  const [cards, setCard] = useState();
  const [dataMultuple, setDataMultiple] = useState();
  const [dataSignle, setDataSingle] = useState();
  const router = useRouter();
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

    const key2 = cards.map((item) => {
      const key2 = JSON.parse(item.split(":")).split(",")[0];
      return key2;
    });

    const key3 = dataMultuple.map((item) => {
      console.log(JSON.parse(item)[0]);
      const key3 = JSON.parse(item)[0].mainCustomFiledId;
      return key3;
    });

    const values3 = dataMultuple.map((item) => {
      const value3 = JSON.parse(item);
      const main = value3.map((items) => {
        return items.selectedid;
      });

      return main;
    });

    const custom_fields = {
      ...key2.reduce((acc, key, index) => {
        const value2 = parseInt(cards[index].split(":")[1]);
        return { ...acc, [key]: [value2] };
      }, {}),

      ...key3.reduce((acc, key, index) => {
        const value3 = values3[index];
        return { ...acc, [key]: value3 };
      }, {}),
      [dataSignle.parentId]: [dataSignle.id],
    };

    axios
      .post(
        `${process.env.NEXT_PUBLIC_MAIN_URL}campaign`,
        {
          title: campaignNameValue,
          type_id: router.query.id,
          balance: totalPrice,
          payment_status: 0,
          item_ids: items,
          custom_fields,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
      .then((response) => {
        if (response.data.success == true) {
          toast.success(response.data.msg);
          setStep(4)
          console.log(response?.data);
        }else if(response.data.success == false){
          toast.error(response.data.msg);
          console.log(response?.data);

        }
      })
      .catch((error) => {
        // toast.error(response.data.msg);
        console.error(error);
      });
  };

  return (
    <div className="w-full p-10 bg-white ">
      <div className="flex items-center justify-start">
        <img src="/icons/security.svg" className="!w-[32px] !h-[32px]" />
        <h3 className=" text-[#001849] font-[500] text-[24px]">جزئیات کمپین</h3>
      </div>
     
      <div className="w-[100%]">
        <div className="w-full mt-10">
          <div className="flex items-center justify-between w-full">
            <div className="flex w-full gap-1">
              <p className="text-[#777777] text-[14px] font-[600]">
                نام کمپین:{" "}
              </p>
              <p className="text-[14px] text-[#000000] font-[500]">
                {campaignNameValue}
              </p>
            </div>
            <div className="flex w-full gap-1 text-start">
              <p className="text-[#777777] text-[14px] font-[600]">
                تاریخ شروع و پایان:
              </p>
              <p className="text-[14px] text-[#000000] font-[500]">
                {campaignStartTimeValue}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full mt-10">
          <div className="flex items-start justify-between w-full">
            <div className="flex w-full gap-1">
              <p className="text-[#777777] text-[14px] font-[600]">
                شبکه اجتماعی:
              </p>
              <p className="text-[14px] text-[#000000] font-[500]">
                {campaignNameValue}
              </p>
            </div>
            <div className="flex w-full gap-1 text-start">
              <p className="text-[#777777] text-[14px] font-[600]">
                نوع کمپین:
              </p>
              <p className="text-[14px] text-[#000000] font-[500]">
              {localStorage.getItem("campaign-type")}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full mt-10">
          <div className="flex items-center justify-between w-full">
            <div className="flex w-full gap-1">
              <p className="text-[#777777] text-[14px] font-[600]">موضوع:</p>
              <p className="text-[14px] text-[#000000] font-[500]">
                {campaignNameValue}
              </p>
            </div>
            <div className="flex w-full gap-1 text-start">
              <p className="text-[#777777] text-[14px] font-[600]">مبلغ کل:</p>
              <p className="text-[14px] text-[#000000] font-[500]">
                {totalPrice}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full mt-10">
          <div className="flex gap-1">
            <p className="text-[#777777] text-[14px] font-[600]">نوع محتوا:</p>
            <p className="text-[14px] text-[#000000] font-[500]">
              {/* {localStorage.getItem("campaign-type")} */}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] mt-10 bg-[#999999]"></div>

      <div className="flex items-center justify-start gap-2 pt-5">
        <img src="/images/Frame 26085853.png" className="!w-[48px] !h-[48px]" />
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

      <div className="w-full pl-64 text-[14px] leading-6  ">
        <p>{ProductUsageValue}</p>
      </div>

      <div className="flex items-center justify-end w-full gap-2 mt-10 ">
        <button
          className="px-4 py-2 font-bold border border-[#DC3545] bg-white rounded text-[#DC3545]"
          onClick={() => setStep((prev)=>prev - 1 )}
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
  );
};

export default CamapignDetail;
