import React, { useEffect, useState } from "react";
import Table from "../../../core/component/Table";
import CampaignLayout from "../../../core/component/campaignLayout";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Input from "../../../core/component/Input/Input";
import { IoMdCloseCircle } from "react-icons/io";
import { Select } from "chakra-react-select";
import CustomSelectTag from "../../../component/CustomSelectTag";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";

const index = () => {
  const [dataTable, setDataTable] = useState();
  const [popUp, setPopUp] = useState();
  const [data, setData] = useState([]);
  const [customField, setCustomField] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [selectedItems, setSelectedItems] = useState({
    name: "",
    type_id: "",
    fields: [],
  });
  const router = useRouter();
  useEffect(() => {
    router.push(`/campaign/campaignList?page=1`);
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_MAIN_URL}campaign-type`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_MAIN_URL}campaign?page=${
          router.query.page || "1"
        }`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
      .then((response) => {
        setDataTable(response.data);
      });
  }, [router.query.page]);

  const handleSelectedOption = (e) => {
    if (e.target.value != 0) {
      setSelectedItems((prevSelectedItems) => ({
        ...prevSelectedItems,
        type_id: e.target.value,
      }));
      axios
        .get(
          `${process.env.NEXT_PUBLIC_MAIN_URL}campaign-type/fields?id=${e.target.value}`
        )
        .then((response) => {
          setCustomField(response.data.data.itemFields);
        });
    }
  };

  const handleSelectedOptionItem = (e) => {
    const selectedIds = e.map((item) => item.id);
    console.log(selectedIds);
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      fields: selectedIds,
    }));
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

  const filteredOptions = customField?.filter(
    (item) => item.is_report !== 0 && item.custom_field_type === 2
  );

  const arr2 = filteredOptions.map((item) => ({
    id: item.id,
    label: item.name,
    value: item.name,
  }));

  const handleSendData = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_MAIN_URL}report`,
        {
          ...selectedItems,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.msg);
          setPopUp(false);
        }
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_MAIN_URL}report`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        setReportData(response.data);
      });
  }, []);

  return (
    <div>
      <CampaignLayout>
        <div className="flex flex-row-reverse gap-4">
          <div className="p-10">
            <Table data={dataTable} />
          </div>
          <div className="w-3/12 h-screen bg-white">
            <div className="w-full pt-10 pr-6 text-start">
              <p className="text-[18px]">ریپورت ها</p>
            </div>
            <div className="px-8 mt-4">
              <button
                className="bg-[#00875A] text-white p-2 w-full rounded-[5px] hover:scale-105"
                onClick={() => setPopUp(true)}
              >
                ساخت ریپورت های‌ جدید
              </button>
            </div>
            <div className="pt-4">
              {reportData?.map((item) => {
                return (
                  <div className="py-4 border-t border-b ">
                    <p>{item.name}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {popUp && (
            <div className="absolute top-0 left-0 w-full h-screen bg-gray-500 bg-opacity-50">
              <div className="absolute w-4/12 mx-auto bg-white top-[30%] left-[50%] -translate-x-[50%] rounded-[5px] p-10">
                <div className="flex items-end justify-end w-full">
                  <IoMdCloseCircle
                    size={"24px"}
                    className="cursor-pointer"
                    onClick={() => setPopUp(false)}
                  />
                </div>
                <Input
                  type="easy"
                  label={"نام"}
                  className={"py-2"}
                  onChange={(e) =>
                    setSelectedItems((prevSelectedItems) => ({
                      ...prevSelectedItems,
                      name: e.target.value,
                    }))
                  }
                />

                {/* <Input label={"نام"} className={"py-2"} /> */}
                <label>کمپین ها</label>
                <select
                  className="w-full py-3 border rounded-[4px]"
                  onChange={handleSelectedOption}
                >
                  <option key={0} value="0">
                    انتخاب کنید
                  </option>
                  {data.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {arr2.length > 0 ? (
                  <div className="pt-4">
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
                ) : (
                  <div className="pt-8">
                    <PulseLoader color="#000000" size={13} />
                  </div>
                )}

                <div className="flex items-end justify-end w-full pt-4">
                  <button
                    className="bg-[#00875A] px-4 py-2 text-white w-fit rounded-[5px]"
                    onClick={handleSendData}
                  >
                    ذخیره
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </CampaignLayout>
    </div>
  );
};

export default index;
