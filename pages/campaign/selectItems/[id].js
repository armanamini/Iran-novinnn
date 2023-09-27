import React, { useEffect, useState, useCallback } from "react";
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
import {
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Slider,
} from "@chakra-ui/react";
import SwiperITems from "../../../component/SwiperSelectItem";
import { useFarsi } from "../../../helper/useFarsiDigits";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { Select } from "chakra-react-select";
import InfiniteScroll from "react-infinite-scroll-component";
import CustomSelectCategory from "../../../component/CustomSelectCategory";

if (typeof window !== "undefined") {
  const local = localStorage.getItem("campaign-type");
  if (local == undefined) {
    toast.warning("مقدار تایپ معتبر نمی باشد");
    window.location.href = "/campaign";
  }
}

const CampaignFlow = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState([]);
  const totalPriceOfItemsValue = useSelector(
    (state) => state.input.totalPriceOfItemsValue
  );

  const [page, setPage] = useState(1); // Initial page number
  const [loading, setLoading] = useState(false);
  const [newItemState, setNewItemState] = useState();
  const [range, setRange] = useState([25, 75]); // Initial range values
  const [searchData, setSearchData] = useState("");

  const [totalPrice, setTotalPrice] = useState(0);

  const [localType, setLocalType] = useState();
  const [filterType, setFilterType] = useState();
  const [filterState, setFilterState] = useState({});
  const [selectFilterState, setSelectFilterState] = useState({});
  const [selectedOptionId, setSelectedOptionId] = useState();
  const [followerRange, setFollowerRange] = useState();
  const [followerRangeValue, setFollowerRangeValue] = useState([0, 0]);
  const [minFollower, setMinFollower] = useState();
  const [maxFollower, setMaxFollower] = useState();
  const [mainValueRange, setMainValueRange] = useState();
  const [mainValueRangePrice, setMainValueRangePrice] = useState();
  const [selectedSortOption, setSelectedSortOption] = useState(); // Initialize with an empty string
  const [customForm, setCustomForm] = useState(); // Initialize with an empty string
  const [banner, setCustomBanner] = useState(); // Initialize with an empty string
  const [arrBanner, setArrBanner] = useState();

  const handleInputChange = (e) => {
    const inputId = e.target.id;
    const inputValue = parseFloat(e.target.value);

    setFollowerRangeValue((prevRange) => {
      const updatedRange = [...prevRange];
      if (inputId === "min") {
        updatedRange[0] = inputValue;
      } else if (inputId === "max") {
        updatedRange[1] = inputValue;
      }
      return updatedRange;
    });
  };

  const handleSwitchChange = (itemId) => {
    setFilterState((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId], // Toggle the switch state
    }));
  };

  const handleSelectChange = (itemId, selectedValues) => {
    setSelectFilterState((prevState) => ({
      ...prevState,
      [itemId]: selectedValues,
    }));
  };
  const handleChange = (selectedOption) => {
    setSelectedSortOption(selectedOption.id);
  };
  const fetchData = useCallback(
    async (value) => {
      try {
        setLoading(true);
        const filterParams = Object.keys(filterState)
          .filter((itemId) => filterState[itemId])
          .map((itemId) => `field[${itemId}]=1`)
          .join("&");

        const selectFilterParams = Object.keys(selectFilterState)
          .filter(
            (itemId) =>
              selectFilterState[itemId] && selectFilterState[itemId].length > 0
          )
          .map((itemId) => {
            const selectedValues = selectFilterState[itemId].map(
              (selectedItem) => selectedItem.id
            );
            return `field[${itemId}]=${selectedValues.join(",")}`;
          })
          .join("&");

        const sortParam = selectedSortOption
          ? `&sort-by=${selectedSortOption}`
          : "";

        console.log("sortParam", sortParam);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_MAIN_URL}campaign-type/items?page=${
            value ? "1" : page
          }&id=${router.query.id}${value ? `&price=${value}` : ""}${
            followerRange ? `&follower=${followerRange}` : ""
          }&search=${searchData}&${filterParams}&${selectFilterParams}${sortParam}`
        );

        if (response.status === 200) {
          if (value) {
            setData(response.data.campaignItems);
          } else if (searchData != "") {
            setData(response.data.campaignItems);
          } else if (selectFilterParams != "") {
            setData(response.data.campaignItems);
          } else if (selectedSortOption != "") {
            setData(response.data.campaignItems);
          } else if (followerRange != "") {
            setData(response.data.campaignItems);
          } else {
            setData((prevData) => [
              ...prevData,
              ...response?.data?.campaignItems,
            ]);
            setPaginate(response.data.pagination);
          }
          setMinFollower(response.data.flow_count[0].min_value);
          setMaxFollower(response.data.flow_count[0].max_value);
          setFilterType(response.data.fields);
        } else {
          toast.error("No data");
        }
      } catch (error) {
        // toast.error("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    },
    [
      page,
      router.query.id,
      searchData,
      filterState,
      selectFilterState,
      followerRange,
      selectedSortOption,
    ]
  );

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
    const localData = JSON.parse(localStorage?.getItem("token")).fieldtypes;
    setLocalType(localData);
  }, [data, filterType]);

  useEffect(() => {
    if (router.query.id) {
      fetchData();
    }
  }, [router.query, fetchData]);

  const handleNextStep = useCallback(() => {
    setStep(step + 1);
  }, [step]);

  const handlePreviousStep = useCallback(() => {
    setStep(step - 1);
  }, [step]);

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

  const handleSendCard = () => {
    if (JSON.parse(localStorage.getItem("items")) != []) {
      try {
        const url = `${process.env.NEXT_PUBLIC_MAIN_URL}campaign-type/custom-form?id=${router.query.id}&type_id=11`;

        const data = {
          items: JSON.parse(localStorage.getItem("items")),
        };

        axios
          .post(url, {
            ...data,
          })
          .then((response) => {
            console.log(
              "response",
              JSON.parse(response.data.custom_form.options)
            );
            setCustomForm(JSON.parse(response.data.custom_form.options));
            setCustomBanner(response.data.item_banners);
          });

        handleNextStep();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const arrCumstom = [
    {
      id: "price-DESC",
      label: "بیشترین قیمت",
      value: "بیشترین قیمت",
    },
    {
      id: "price-ASC",
      label: "کمترین قیمت",
      value: "کمترین قیمت",
    },
    {
      id: "DESC",
      label: "جدید ترین",
      value: "جدید ترین",
    },
    {
      id: "ASC",
      label: "قدیمی ترین",
      value: "قدیمی ترین",
    },
  ];
  
  const selectedBanner = (e) => {
    console.log("sadjhsadbsadsadsadsa", e);
    setArrBanner(e);
  };
  return (
    <div className="mx-auto ">
      <CampaignLayout>
        <div className="bg-[#FEFBFF] ">
          <div className="flex flex-col items-center justify-center mt-2 h-max">
            <div className="w-11/12 pt-5">
              {step == 1 && (
                <div className="relative">
                  <h1 className="mb-4 text-[24px] font-bold text-[#001849]">
                    پیشنهادها
                  </h1>
                  <div className="px-0 py-4 bg-red-300">
                    <SwiperITems data={data} />
                  </div>
                  <div className="flex h-full">
                    {/* <StepOneComponent /> */}

                    <div className="relative w-1/3 h-screen">
                      <div className="mt-10 xl:hidden ">
                        <div className="ml-auto w-[90%] bg-white h-screen">
                          {filterType?.map((item) => {
                            if (item.is_filter == 1) {
                              switch (localType[item.type_id]) {
                                case "check box":
                                  return (
                                    <div
                                      className="flex p-4 pt-10 gap-x-4"
                                      key={item.id}
                                    >
                                      <Switch
                                        defaultChecked={filterState[item.id]}
                                        onChange={() =>
                                          handleSwitchChange(item.id)
                                        }
                                        className="bg-[#8C8C8C]"
                                      />
                                      <p className="text-[16px] font-semibold">
                                        {item.name}
                                      </p>
                                    </div>
                                  );
                                case "select multi":
                                  const options = JSON.parse(item.options).map(
                                    (element) => ({
                                      id: element.cfo_id,
                                      value: element.cfo_name,
                                      label: element.cfo_data,
                                    })
                                  );

                                  return (
                                    <div className="relative z-40 p-4">
                                      <Select
                                        key={item.id}
                                        isMulti
                                        DropdownIndicator={true}
                                        options={options}
                                        styles={customStyles}
                                        placeholder="آپشن انتخاب کنید"
                                        onChange={(selectedValue) => {
                                          console.log(
                                            "selectedValues",
                                            selectedValue
                                          );

                                          handleSelectChange(
                                            item.id,
                                            selectedValue
                                          );
                                        }}
                                        components={{
                                          DropdownIndicator: () => null,
                                        }}
                                      />
                                    </div>
                                  );

                                case "radio":
                                  return (
                                    <div>
                                      <p className="p-2">نوع تعرفه</p>
                                      <div className="flex items-center justify-center gap-3 p-2">
                                        <input
                                          type="checkbox"
                                          className="w-5 h-5 form-checkbox !outline-[#D9D9D9]"
                                        />
                                        <span className="text-[#00000040]">
                                          کسب و کار
                                        </span>
                                      </div>
                                    </div>
                                  );

                                default:
                                  break;
                              }
                            }
                          })}

                          <div>
                            <div className="px-4 py-10 ">
                              <p className="pb-3">بازه قیمت (تومان)</p>

                              <RangeSlider
                                min={0}
                                defaultValue={mainValueRangePrice}
                                onChangeEnd={(value) => {
                                  if (value) {
                                    setMainValueRangePrice(value);
                                    fetchData(value);
                                  }
                                }}
                              >
                                <RangeSliderTrack>
                                  <RangeSliderFilledTrack />
                                </RangeSliderTrack>
                                <RangeSliderThumb index={0} />
                                <RangeSliderThumb index={1} />
                              </RangeSlider>

                              <div>
                                <p className="text-end text-[#00000040]">
                                  100 میلیون
                                </p>
                              </div>
                              <div className="w-full text-[#00000040] ">
                                از 2000 تا 40000
                              </div>
                            </div>
                            <div className="px-4">
                              <p className="pb-3"> بازه فالوئر (نفر) </p>
                              <RangeSlider
                                min={0}
                                max={Math.floor(maxFollower)}
                                defaultValue={[0, 30000]}
                                onChangeEnd={(e) => {
                                  if (e) {
                                    setFollowerRange([
                                      Math.floor(e[0]),
                                      Math.floor(e[1]),
                                    ]);
                                  }
                                }}
                              >
                                <RangeSliderTrack>
                                  <RangeSliderFilledTrack />
                                </RangeSliderTrack>
                                <RangeSliderThumb index={0} />
                                <RangeSliderThumb index={1} />
                              </RangeSlider>
                              <div className="flex flex-row-reverse justify-between w-full">
                                <p className="text-end text-[#00000040]">
                                  {followerRange ? followerRange[0] * 100 : 0}
                                </p>
                                <p className="text-end text-[#00000040]">
                                  {followerRange
                                    ? followerRange[1] * 100
                                    : Math.floor(maxFollower) * 100}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* end of stepComponent */}
                    <div
                      style={{
                        boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.25)",
                      }}
                      className="col-span-9 bg-white xl:col-span-12 w-full rounded-[8px] mt-10"
                    >
                      <div>
                        <div className="grid justify-between grid-cols-12 px-7">
                          <div className="flex col-span-6 gap-2 p-5">
                            <input
                              onChange={(e) => {
                                setSearchData(e.target.value);
                              }}
                              placeholder={"جستجو"}
                              type="text"
                              className={`border-[#D9D9D9] !border h-[130%] !rounded-[4px] outline-none w-full py-2 placeholder:!text-[#C5C6D0] placeholder:p-5`}
                            />

                            <div
                              className={` relative !rounded-[4px] outline-none w-full py-2 placeholder:!text-[#C5C6D0] placeholder:p-5`}
                            >
                              <div className="absolute top-0 z-10 w-full h-[130%]  border-[#D9D9D9] border">
                                <CustomSelect
                                  options={arrCumstom}
                                  value={selectedSortOption}
                                  label={" دسته بندی بر اساس"}
                                  onChange={(e) => setSelectedSortOption(e)}
                                  selectedOptionId={(e) =>
                                    setSelectedSortOption(e)
                                  }
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-12 col-span-6 p-5 ">
                            <input
                              placeholder={"دانلود اکسل پلن های انتخابی"}
                              type="text"
                              className={`border-[#D9D9D9] col-start-13 col-end-7  !border !rounded-[4px] outline-none w-full py-2 placeholder:!text-[#C5C6D0] placeholder:p-5`}
                            />
                          </div>
                        </div>
                      </div>

                      <InfiniteScroll
                        dataLength={data.length}
                        next={() => {
                          setPage((prevPage) => prevPage + 1);
                        }}
                        hasMore={!loading}
                        scrollThreshold={1}
                        loader={<h4>Loading...</h4>}
                        endMessage={<p>No more campaigns to load.</p>}
                        className="relative grid grid-cols-12 gap-2 p-4 px-8 sm:px-2 md:px-4 lg:px-6"
                      >
                        {data.map((item, index) => (
                          <CampaignCards key={item.id} data={item} />
                        ))}
                      </InfiniteScroll>
                    </div>
                  </div>

                  <div
                    className={
                      "flex flex-row-reverse w-full border-t-[2px] py-4  bg-white sticky bottom-0 z-20 left-0"
                    }
                  >
                    <div className="flex w-[100%] gap-2 flex-row-reverse">
                      <button
                        className="px-4 py-2 font-bold w-fit text-white rounded bg-[#DC3545]"
                        onClick={() => {
                          if (localStorage.getItem("campaign-type") == 3) {
                            handleSendCard();
                          } else {
                            handleNextStep();
                          }
                        }}
                      >
                        ادامه
                      </button>
                      <button
                        className="px-4 py-2 font-bold w-fit border border-[#DC3545] bg-white rounded text-[#DC3545]"
                        onClick={() => router.back()}
                      >
                        مرحله قبل
                      </button>
                    </div>

                    {step == 1 && (
                      <div className="w-full">
                        <p className="text-[23px]">
                          مجموع:{" "}
                          {totalPriceOfItemsValue
                            ? useFarsi(totalPriceOfItemsValue)
                            : "0"}{" "}
                          تومان
                        </p>
                      </div>
                    )}
                  </div>
                </div>
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
                    <ContentForm
                      customForm={customForm}
                      banner={banner}
                      selectedBanner={selectedBanner}
                    />
                  </div>
                </>
              )}
              {step == 3 && (
                <div className="flex items-center justify-center w-full gap-4 pb-4 px-30">
                  <CamapignDetail
                    arrBanner={arrBanner}
                    step={true}
                    setStep={(e) => {
                      setStep(e);
                    }}
                  />
                </div>
              )}

              {step == 4 && (
                <div className="flex items-center justify-center w-full gap-4 pb-4 px-30">
                  <InvoicePdf />
                </div>
              )}

              {step != 4 && (
                <div className="flex items-end justify-end w-full gap-2 pt-3">
                  {step != 1 && step != 3 && (
                    <div className="flex gap-2">
                      <button
                        className="px-4 py-2 font-bold border border-[#DC3545] bg-white rounded text-[#DC3545]"
                        onClick={handlePreviousStep}
                      >
                        مرحله قبل
                      </button>
                      <button
                        className="px-4 py-2 font-bold text-white rounded bg-[#DC3545]"
                        onClick={handleNextStep}
                      >
                        ادامه
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </CampaignLayout>
    </div>
  );
};

export default CampaignFlow;
