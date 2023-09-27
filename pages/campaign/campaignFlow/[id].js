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
import CustomSelectTag from "../../../component/CustomSelectTag";

const CampaignFlow = () => {
useEffect(()=>{

},[])

  const router = useRouter();
  const [flow, setFlow] = useState();
  const [data, setData] = useState();
  const [newItemState, setNewItemState] = useState();
  const [selected, setSelected] = useState([]);
  const [step, setStep] = useState(1);

  const [selectedLabels, setSelectedLabels] = useState([]);

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
          `${process.env.NEXT_PUBLIC_MAIN_URL}campaign-type/fields?id=${router.query.id}`
        )
        .then((response) => {
          if (response?.data?.data?.before_item_flow) {
            setFlow(JSON.parse(response?.data?.data?.before_item_flow));
          }
          localStorage.setItem(
            "campaign-type",
            response?.data?.data?.type_mode
          );
          
          console.log("flowww", response.data.data);
        });
    }
  }, [router.query]);

  useEffect(() => {
    if (router.query.id) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_MAIN_URL}campaign-type/details?id=${router.query.id}`
        )
        .then((response) => {
          setData(response.data);
        });
    }
  }, [router.query]);

  const handleNextStep = () => {
    setStep(step + 1);
    router.push(`/campaign/campaignFlow/${router.query.id}?step=${step + 1}`);
    console.log(router);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
    router.push(
      `/campaign/campaignFlow/${router.query.id}?step=${router.query.step - 1}`
    );
  };

  const handleSelectChange = (e) => {
    setSelected(e);

    // Update the selected value before checking its length
    const updatedSelected = e;
    console.log(e);
    if (updatedSelected.length > 0) {
      localStorage.setItem(
        `customFileds${e[0]?.mainCustomFiledId}`,
        JSON.stringify(updatedSelected)
      );
    } else {
      localStorage.removeItem(`customFileds${e[0]?.mainCustomFiledId}`);
    }
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

  const handleSentSelect = (e) => {
    const selectedOption = JSON.parse(e.target.value);
    // setSelected([selectedOption]);
    setSelectedLabels([selectedOption.label]); // Show only the label of the current selected option

    console.log("selectedOption", selectedOption);

    localStorage.setItem(
      `single select ${selectedOption.parentId}`,
      e.target.value
    );
  };
  let currentLatestItem = null;

  return (
    <div>
      <CampaignLayout>
        <div className="flex flex-col items-center justify-center mt-1">
          {flow?.map((item, index) => {
            if (router.query.step != index + 1) return null;

            const filteredOptions = [];
            for (const option of item.options) {
              const newItem = data?.filter((item) => item.id == option.id);
              if (newItem) {
                filteredOptions.push(newItem);
              }
            }

            return (
              <div key={item?.id} className="w-10/12 pt-10 ">
                <div className="flex gap-2">
                  <img
                    src="/icons/security.svg"
                    className="!w-[32px] !h-[32px]"
                  />
                  <h1 className="mb-4 text-2xl font-bold text-black">
                    {item.name}
                  </h1>
                </div>
                <div
                  className="px-10 py-[24px] bg-white w-full rounded-[8px]"
                  style={{
                    boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <div className="flex flex-wrap items-center justify-center gap-8">
                    {filteredOptions?.map((newItem) =>
                      newItem.map((latestItem) => {
                        switch (newItemState[latestItem?.type_id]) {
                          case "card":
                            return (
                              <FlowCard
                                length={flow.length}
                                index={index}
                                setStep={setStep}
                                key={latestItem.id}
                                data={latestItem.options}
                                mainId={latestItem}
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
                        // Store the latest item outside the map function
                        currentLatestItem = latestItem;

                        switch (newItemState[currentLatestItem.type_id]) {
                          case "select multi":
                            console.log("select multi", currentLatestItem.data);
                            const parsedOptions = JSON.parse(
                              currentLatestItem.options
                            );
                            const arr = parsedOptions.map((element) => ({
                              mainCustomFiledId: currentLatestItem.id,
                              selectedid: element.cfo_id,
                              label: element.cfo_name || " ",
                              value: element.cfo_data || " ",
                            }));

                            return (
                              <div
                                className="flex flex-col items-start justify-start w-6/12 px-1 "
                                key={currentLatestItem.id}
                              >
                                <label className="py-2">
                                  {currentLatestItem.name}
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
                            console.log("select single", currentLatestItem);
                            const parsedOptionsSingle = JSON.parse(
                              currentLatestItem.options
                            );
                            const arr2 = parsedOptionsSingle.map((element) => ({
                              parentId: currentLatestItem.id,
                              id: element.cfo_id,
                              label: element.cfo_name,
                              value: element.cfo_data,
                            }));

                            return (
                              <div
                                className="flex flex-col items-start justify-start w-6/12 px-2"
                                key={currentLatestItem.id}
                              >
                                <label className="py-2">
                                  {currentLatestItem.name}
                                </label>

                                <div className="w-full border rounded-[4px]">
                                  <CustomSelectTag
                                    options={arr2}
                                    onChange={(e) => handleSentSelect(e)}
                                    
                                  />
                                </div>
                              </div>
                            );

                          default:
                            return null;
                        }
                      })
                    )}

                    {newItemState[currentLatestItem?.type_id] ==
                      "select multi" ||
                    newItemState[currentLatestItem?.type_id] ==
                      "select single" ? (
                      <div className="bg-[#FEF9F9] mt-[48px] w-full border-[#DC3545] border p-5 px-4 rounded-[8px]">
                        {selected?.map((label, index) => (
                          <div key={index} className="flex gap-1 pr-4">
                            <p className="text-[14px] font-[500]">
                              {label.value}
                            </p>
                          </div>
                        ))}
                        {selectedLabels?.map((label, index) => (
                          <div key={index} className="flex gap-1 pr-4">
                            <p className="text-[14px] font-[500]">{label}</p>
                          </div>
                        ))}
                        <div className="flex gap-1 pr-4">
                          <p className="text-[14px] font-[500]">
                            توجه: اطلاعات شرکت شما برای بررسی صحت اطلاعات وارد
                            شده با حفظ حریم خصوصی بررسی می شود.
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-end justify-end w-full gap-2 pt-3">
                    {router.query.step != 1 && (
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
                        onClick={() =>
                          router.push(
                            `/campaign/selectItems/${router.query.id}`
                          )
                        }
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
