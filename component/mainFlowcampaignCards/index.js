import React, { use, useEffect, useMemo, useState } from "react";
import { useFarsi } from "../../helper/useFarsiDigits";
import config from "../../data/config.json";
import { formatNumber } from "../../helper/formatNumber";
import { addCommas } from "../../helper/addCommas";
import { Select } from "chakra-react-select";

import { useDispatch, useSelector } from "react-redux";
import { updatetotalPriceOfItemsValue } from "../../redux/slice";

const CampaignCards = ({ data, updateTotalPrice }) => {
  const [handleId, setHandleId] = useState([data.id]);
  const [arr, setArr] = useState([]);
  const dispatch = useDispatch();
  const [followerField, setFollowerField] = useState("");
  const [follower, setFollower] = useState("");
  const [userNameField, setUserNameField] = useState("");
  const [userName, setUserName] = useState("");
  const [customField, setCustomField] = useState([]);
  const [selectedOptionsTotalPrice, setSelectedOptionsTotalPrice] = useState(0);

  const storedItems = localStorage?.getItem("items");
  const initialItems = storedItems ? JSON.parse(storedItems) : [];
  const isItemSelected = initialItems.some((item) => item.id == data.id);

  useEffect(() => {
    setCustomField(JSON.parse(data.extra_option_price));
  }, [data]);

  const arr2 = customField.map((item) => ({
    price: item.price,
    label: item.name,
    value: item.name,
  }));

  useEffect(() => {
    const campaignType = localStorage.getItem("campaign-type");
    const matchingConfigItem = config?.find((item) =>
      item.hasOwnProperty(campaignType)
    );

    const followerFieldArray = matchingConfigItem[campaignType];

    const updatedFollowerField = followerFieldArray.find((item) =>
      item.hasOwnProperty("propertyName2")
    );
    const updatedUserNameField = followerFieldArray.find((item) =>
      item.hasOwnProperty("propertyName3")
    );

    const parsedOptions = JSON.parse(data.options);
    const followerFieldId = updatedFollowerField?.propertyName2;
    const userNameFieldId = updatedUserNameField?.propertyName3;

    const matchingFollowerOption = parsedOptions.find(
      (item) => item.field_id == followerFieldId
    );

    const matchingUserNameOption = parsedOptions.find(
      (item) => item.field_id == userNameFieldId
    );

    if (matchingFollowerOption) {
      setFollower(matchingFollowerOption.value);
    }

    if (matchingUserNameOption) {
      setUserName(matchingUserNameOption.value);
    }
  }, [config, data]);

  const handleCommonLogic = (e, selectedOptionsTotal = 0) => {
    const storedItems = localStorage?.getItem("items");
    let updatedItems = storedItems ? JSON.parse(storedItems) : [];

    const storedPrices = localStorage?.getItem("prices");
    let updatedPrices = storedPrices ? JSON.parse(storedPrices) : {};

    const newItem = {
      id: data.id,
      options: selectedOptionsTotal > 0 ? selectedOptionsTotal : [],
      quantity: 1,
    };

    const existingIndex = updatedItems.findIndex((item) => item.id === data.id);

    if (existingIndex !== -1) {
      // Item already exists, remove it
      updatedItems.splice(existingIndex, 1);
      delete updatedPrices[e];
    } else {
      // Item doesn't exist, add it
      updatedItems.push(newItem);
      updatedPrices[e] = data.price + selectedOptionsTotal;
    }

    localStorage.setItem("items", JSON.stringify(updatedItems));
    localStorage.setItem("prices", JSON.stringify(updatedPrices));

    setArr(updatedItems.map((item) => item.id));
    setHandleId(updatedItems.map((item) => item.id)); // Update handleId with updatedItems

    // ... (rest of the code)
  };

  const handleClicked = (e) => {
    handleCommonLogic(e);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "2px ",
      borderColor: "gray.300",
      "&:hover": {
        borderColor: "gray.400",
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      display: "block", // hide the dropdown chevron
    }),
  };

  useEffect(() => {
    const storedPrices = localStorage?.getItem("prices");
    if (storedPrices) {
      const prices = JSON.parse(storedPrices);
      const totalPrice = Object.values(prices)?.reduce(
        (acc, curr) => acc + curr,
        0
      );
      dispatch(updatetotalPriceOfItemsValue(totalPrice));
    }
  }, [handleId]);

  let updatedItems = [];

  if (storedItems) {
    updatedItems = JSON.parse(storedItems);
  }

  const handleSelectedOptionItem = (selectedOptions) => {
    const selectedOptionsTotal = selectedOptions.reduce(
      (total, option) => total + parseFloat(option.price),
      0
    );

    const updatedItems = JSON.parse(localStorage?.getItem("items") || "[]");

    setSelectedOptionsTotalPrice(selectedOptionsTotal); // Update the total price of selected options

    const newItem = {
      id: data.id,
      options: selectedOptions.map((option) => ({
        name: option.label,
        price: option.price,
      })),
      quantity: 1,
    };

    const index = updatedItems.findIndex((item) => item.id === data.id);

    if (newItem.options.length === 0) {
      // Remove the item if its options are empty
      if (index !== -1) {
        updatedItems.splice(index, 1);
        const storedPrices = JSON.parse(
          localStorage?.getItem("prices") || "{}"
        );
        delete storedPrices[data.id];
        localStorage.setItem("prices", JSON.stringify(storedPrices));
      }
    } else if (index !== -1) {
      // Update the existing item
      updatedItems[index] = newItem;
      const storedPrices = JSON.parse(localStorage?.getItem("prices") || "{}");
      storedPrices[data.id] = data.price + selectedOptionsTotal;
      localStorage.setItem("prices", JSON.stringify(storedPrices));
    } else {
      // Add the item if it's not in the list
      updatedItems.push(newItem);
      const storedPrices = JSON.parse(localStorage?.getItem("prices") || "{}");
      storedPrices[data.id] = data.price + selectedOptionsTotal;
      localStorage.setItem("prices", JSON.stringify(storedPrices));
    }

    localStorage.setItem("items", JSON.stringify(updatedItems));

    setHandleId((prevHandleId) => [...prevHandleId, data.id]);
  };

  return (
    <div
      key={data.id}
      class={
        "relative border rounded-[4px] col-span-4   md:col-span-6 mx-auto sm:col-span-12  w-full"
      }
    >
      <div class="relative inline-block w-full">
        <div class="shadow p-4 rounded-[4px] bg-white">
          <div class="flex justify-center relative rounded-lg overflow-hidden h-[80%] w-[80%]">
            <div class="absolute w-full inset-0 rounded-[50%] bg-black opacity-10 border border-gray-950"></div>
          </div>

          <div class="px-4 pt-4">
            <p class="mt-2 text-[16px] font-[500] text-gray-800 line-clamp-1">
              {data?.name}
            </p>
          </div>

          <div className="pt-4">
            <div className="flex items-center justify-between px-4">
              <img
                src={
                  data?.primary_image
                    ? `${process.env.NEXT_PUBLIC_MAIN_URL_IMG}${data?.primary_image}`
                    : "/icons/profile.svg"
                }
                className="!w-[64px] !h-[64px] rounded-[50%]"
              />

              {/* <div className="flex flex-col items-center justify-center">
                <p className="text-[22px] font-[600] ">
                  {useFarsi(data[propertyName])}
                </p>
                <span className="text-[#00000073] text-[14px] block font-[600]">
                  امتیاز
                </span>
              </div> */}

              <div>
                <p className="text-[22px] font-[600] text-centers">
                  {useFarsi(follower)}
                </p>
                <span className="text-[#00000073] text-[14px] block font-[600]">
                  فالوورها
                </span>
              </div>
            </div>

            <div className="flex flex-col px-4 pt-2">
              <p
                className="text-[16px] font-[500] ltr text-end "
                style={{
                  fontFamily: "sans-serif",
                }}
              >
                @{userName}
              </p>
              <span className="block text-[14px] font-[600] text-[#FF4004]">
                برنامه نویسی
              </span>
              <span className="block text-[#BFBFBF] font-[500] ">
                ویو استوری
              </span>
            </div>
          </div>

          <div className="w-full py-8">
            <div class="grid grid-cols-2  gap-x-4 mt-4">
              <div class="flex items-center border p-2 border-[#1890FF] rounded-[4px] ">
                <p class="ml-2 text-[#1890FF] text-center w-full line-clamp-1 ">
                  قوانین{" "}
                </p>
              </div>
              <div class="flex items-center border border-[#52C41A] p-2 rounded-[4px] ">
                <p class="ml-2 text-[#52C41A] text-center w-full line-clamp-1">
                  {data?.fq_used}
                  بار انتخاب شده
                </p>
              </div>
            </div>

            <div className="w-full py-2">
              <label>آیتم ها</label>
              <Select
                isMulti
                DropdownIndicator={false}
                options={arr2}
                placeholder="آپشن انتخاب کنید"
                onChange={handleSelectedOptionItem}
                styles={customStyles}
                components={{
                  DropdownIndicator: () => null,
                }}
              />
            </div>
          </div>

          <div className="absolute left-0 w-full h-[1px] bg-[#00000040] bottom-[5rem]"></div>

          <div class="grid grid-cols-2 ">
            <div class="flex justify-start p-2">
              <p class="inline-block font-semibold  text-primary whitespace-nowrap leading-tight rounded-xl">
                <span class="text-lg ml-1">
                  {useFarsi(addCommas(data.price + selectedOptionsTotalPrice))}
                </span>
                <span class="text-sm uppercase">تومان</span>
              </p>
            </div>

            <div
              onClick={() => handleClicked(data.id)}
              class={
                isItemSelected
                  ? "cursor-pointer flex items-center border border-[#DC3545] bg-[#DC3545] rounded-[4px]"
                  : "cursor-pointer flex items-center border border-[#DC3545] rounded-[4px]"
              }
            >
              <p
                class={
                  isItemSelected
                    ? " text-white text-center w-full line-clamp-1 "
                    : " text-[#DC3545] text-center w-full line-clamp-1"
                }
              >
                {isItemSelected ? "انتخاب شده" : "انتخاب"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCards;
