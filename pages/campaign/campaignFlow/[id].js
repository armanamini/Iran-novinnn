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

const CampaignFlow = () => {
  const router = useRouter();
  const [flow, setFlow] = useState();
  const [data, setData] = useState();
  const [newItemState, setNewItemState] = useState();
  const [selected, setSelected] = useState([]);

  const [selectedValue, setSelectedValue] = useState();

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
        .get(`https://api.adboost.dev/v1/campaign-type/${router.query.id}`)
        .then((response) => {
          if (response.data.data.before_item_flow) {
            setFlow(JSON.parse(response.data.data?.before_item_flow));

            console.log("flowww", response.data.data);
          } else {
            toast.error("دیتایی وجود ندارد");
          }
        });
    }
  }, [router.query]);

  useEffect(() => {
    if (router.query.id) {
      axios
        .get(
          `https://api.adboost.dev/v1f/campaign-type/details?id=${router.query.id}`
        )
        .then((response) => {
          setData(response.data);
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

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "2px",
      borderColor: "gray.300",
      "&:hover": {
        borderColor: "gray.400",
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      display: "none", // hide the dropdown chevron
    }),
  };

  return (
    <div className="overflow-x-hidden">
      <CampaignLayout>
        <div className="flex flex-col items-center justify-center">
          {flow?.map((item, index) => {
            if (step !== index + 1) return null;

            const filteredOptions = [];
            for (const option of item.options) {
              const newItem = data?.filter((item) => item.id == option.id);
              if (newItem) {
                filteredOptions.push(newItem);
              }
            }

            return (
              <div key={item?.id} className="w-10/12 pt-10">
                <h1 className="mb-4 text-2xl font-bold text-black">
                  {item.name}
                </h1>
                <div
                  className="p-10  w-full rounded-[8px] mt-10 "
                  style={{
                    boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <div className="flex flex-wrap items-center justify-center pb-4 px-30">
                    {filteredOptions?.map((newItem) =>
                      newItem.map((latestItem) => {
                        console.log("need id", latestItem);
                        switch (newItemState[latestItem?.type_id]) {
                          case "card":
                            console.log("card", latestItem?.options);
                            return (
                              <FlowCard
                                data={latestItem.options}
                                key={latestItem.id}
                              />
                            );
                          default:
                            return null; // Add a return statement in the default case
                        }
                      })
                    )}
                  </div>

                  <div className="flex flex-row flex-wrap items-center justify-center w-full pb-4">
                    {filteredOptions.map((newItem) =>
                      newItem.map((latestItem) => {
                        console.log("need id", latestItem);
                        switch (newItemState[latestItem.type_id]) {
                          case "select multi":
                            console.log("select multi", latestItem.data);
                            const parsedOptions = JSON.parse(
                              latestItem.options
                            );

                            const arr = [];
                            parsedOptions.map((element) => {
                              const obj = {
                                label: element.cfo_name,
                                value: element.cfo_data,
                              };
                              arr.push(obj);
                              console.log("arr", arr);
                            });

                            return (
                              <div className="flex flex-col items-start justify-start h-[100px] w-6/12 px-1 ">
                                <label className="py-2">
                                  {latestItem.name}
                                </label>
                                <div
                                  className="relative w-full"
                                  id="SelectContainer"
                                >
                                  <Select
                                    isMulti
                                    DropdownIndicator={false}
                                    options={arr}
                                    placeholder="آپشن انتخاب کنید"
                                    onChange={handleSelectChange}
                                    styles={customStyles}
                                    components={{
                                      DropdownIndicator: () => null,
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          case "select single":
                            return (
                              <div className="flex flex-col items-start justify-start w-6/12 h-[100px] px-1">
                                <label className="py-2">هدف کمپین</label>
                                <select className="w-full p-1 rounded-[2px] bg-white border py-2">
                                  <option>1</option>
                                  <option>2</option>
                                </select>
                              </div>
                            );
                          default:
                            return null;
                        }
                      })
                    )}
                    {
                      <div className="bg-[#FEF9F9] mt-10 w-full border-[#DC3545] border p-5 px-7 rounded-[8px]">
                        {selected.length > 0 ? (
                          selected?.map((e, i) => (
                            <div key={i} className="flex gap-1">
                              <p>{i + 1} -</p>
                              <p>{e.value || arr[0].value}</p>
                            </div>
                          ))
                        ) : (
                          <div className="flex gap-1">
                            <p className="text-black">
                              توجه: اطلاعات شرکت شما برای بررسی صحت اطلاعات وارد
                              شده با حفظ حریم خصوصی بررسی می شود.
                            </p>
                          </div>
                        )}
                      </div>
                    }
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

                    {index + 1 != flow.length ? (
                      <button
                        className="px-4 py-2 font-bold text-white rounded bg-[#DC3545]"
                        onClick={handleNextStep}
                      >
                        ادامه
                      </button>
                    ) : (
                      <button
                        className="px-4 py-2 font-bold text-white bg-[#DC3545] rounded"
                        onClick={()=>router.push(`/campaign/selectItems/${router.query.id}`)}
                      >
                        ادامه
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CampaignLayout>
    </div>
  );
};

export default CampaignFlow;
