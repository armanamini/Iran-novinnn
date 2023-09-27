import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import MultiSelectDropdownValue from "../MultiSelectDropdownValue";
import TagsInput from "../TagInput";
import Cookies from "js-cookie";
import BannerSelectionModal from "../BannerSelectionModal";
import PopupNotif from "../popupNotif";

const CreateValue = ({ isOpen, onClose, id, formData }) => {
  const [inputValues, setInputValues] = useState([]);
  const [csField, setCsfield] = useState();
  const [keywords, setKeyWords] = useState();
  const [banner, setBanner] = useState();
  const [bannerItems, setBannerItems] = useState();
  const [selectedBanners, setSelectedBanners] = useState([]);
  const [tag, setTag] = useState();
  const [inputsValue, setInputsValue] = useState();

  const [isBannerModalOpen, setBannerModalOpen] = useState(false); // State for the banner selection modal
  const [availableBanners, setAvailableBanners] = useState([]);
  const [cpcValues, setCpcValues] = useState({});
  const [banners, setBanners] = useState([]);

  const router = useRouter();
  const itemId = router.query.id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalValues, setModalValues] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalValues([]);
  };
  const getData = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_MAIN_URL}campaign-type/detail-item-fields?id=
      ${id}`
      )
      .then((response) => {
        const custonFileds = response.data.fields;
        const custonKeyWords = response.data.keywords;
        setKeyWords(custonKeyWords);
        setBanner(response.data.banners);

        Object.entries(response.data.banners).map((item) => {
          console.log("dsdsds", Object.values(item)[1]);
        });
        setCsfield(custonFileds);

        // Initialize inputValues with default values
        const initialValues = custonFileds.map((item) => ({
          custom_field_id: item.id,
          value: item.value,
        }));

        setInputValues(initialValues);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle error, show toast, etc.
      });
  };

  useEffect(() => {
    // Fetch data using the provided API endpoint
    if (isOpen) {
      getData();
    }
  }, [isOpen]);

  const handleMultiSelectChange = (customFieldId, selectedOptions, type_id) => {
    const newItem = {
      custom_field_id: customFieldId,
      value: `,${selectedOptions.join(",")},`,
      is_option_field: type_id === 5 || type_id === 6 ? 1 : 0,
    };

    console.log("selectedOptions", selectedOptions);

    const existingIndex = inputValues.findIndex(
      (item) => item.custom_field_id === customFieldId
    );

    if (existingIndex !== -1) {
      const updatedInputValues = [...inputValues];
      updatedInputValues[existingIndex] = newItem;
      setInputValues(updatedInputValues);
    } else {
      setInputValues([...inputValues, newItem]);
    }
  };

  const handleInputChange = (customFieldId, value, type_id) => {
    const newItem = {
      custom_field_id: customFieldId,
      value: value,
      is_option_field: type_id === 5 || type_id === 6 ? 1 : 0, // Set is_option_field based on type_id
    };

    setInputsValue({
      [customFieldId]: value,
    });

    const existingIndex = inputValues.findIndex(
      (item) => item.custom_field_id === customFieldId
    );

    if (existingIndex !== -1) {
      const updatedInputValues = [...inputValues];
      updatedInputValues[existingIndex] = newItem;
      setInputValues(updatedInputValues);
    } else {
      setInputValues([...inputValues, newItem]);
    }
  };

  const handleSubmit = () => {
    const postData = {
      fields_val: inputsValue,
      ...formData,
      banner_id: cpcValues,
      keyword_id: tag,
    };

    console.log(postData);

    // Uncomment the axios.post() and toast lines after testing
    axios
      .post(`${process.env.NEXT_PUBLIC_MAIN_URL}campaign-type-item`, postData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.msg);
          onClose();
          getData();
        } else {
          toast.error(response.data.msg);
          onClose();
        }
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        toast.error("Error submitting data. Please try again.");
      });
  };

  const toggleBannerItem = (itemId) => {
    if (selectedBanners[itemId]) {
      // If the item is already selected, remove it from selectedBanners and its CPC value.
      const updatedSelectedBanners = { ...selectedBanners };
      delete updatedSelectedBanners[itemId];
      setSelectedBanners(updatedSelectedBanners);
    } else {
      // If the item is not selected, add it to selectedBanners with a default CPC value.
      setSelectedBanners({ ...selectedBanners, [itemId]: [] });
    }
  };
  const handleAddCPCValue = (itemId, size) => {
    if (cpcValues[itemId] && cpcValues[itemId].length > 0) {
      const updatedCpcValues = { ...cpcValues };
      updatedCpcValues[itemId].push(inputsValue[itemId]);
      setCpcValues(updatedCpcValues);
    } else {
      setCpcValues({ ...cpcValues, [itemId]: [inputsValue[itemId]] });
    }

    // Get all entered values for each item
    const allValues = Object.entries(cpcValues)
      .filter(([key, value]) => value !== "")
      .map(([key, value]) => ({
        value: value,
        size: size,
      }));

    console.log("allValues", allValues);
    // Update the modalValues state with all values
    setModalValues(allValues, size);

    // Reset the input value
    setInputsValue({ ...inputsValue, [itemId]: "" });

    // Open the modal
    openModal();
  };

  const handleDataChange = (e) => {
    setTag(e);
  };
  const toggleBannerModal = () => {
    setBannerModalOpen(!isBannerModalOpen);
  };

  return (
    <>
      <PopupNotif
        isOpen={isModalOpen}
        onClose={closeModal}
        values={modalValues}
      />

      <div className="w-[80rem] mx-auto overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-auto mx-auto my-6">
          <div className="bg-white  rounded-[16px] px-4 shadow-sm outline-none focus:outline-none">
            <div className="flex items-center  p-5 border-b border-solid rounded-t border-[#A5A3A3] border-opacity-80">
              <h3 className="text-[24px] ">ورود اطلاعات </h3>
            </div>
            <div className="relative flex-auto p-6">
              <div>
                {csField?.map((item) => (
                  <div key={item.id}>
                    <label className="block mb-2 text-right text-[14px] text-black text-opacity-80">
                      {item.name}
                    </label>
                    {item.type_id === 5 ? (
                      <select
                        className="w-full border border-gray-400 mb-2 p-2 rounded-[2px] focus:outline-none"
                        defaultValue={item.value}
                        onChange={(e) =>
                          handleInputChange(
                            item.id,
                            e.target.value,
                            item.type_id
                          )
                        }
                      >
                        {item.options &&
                          JSON.parse(item.options).map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                      </select>
                    ) : item.type_id === 6 ? (
                      <MultiSelectDropdownValue
                        options={JSON.parse(item.options)}
                        defaultSelectedOptionIds={String(item?.value)
                          .split(",")
                          .map((id) => parseInt(id))}
                        onChange={(selectedOptions) =>
                          handleMultiSelectChange(
                            item.id,
                            selectedOptions,
                            item.type_id
                          )
                        }
                      />
                    ) : (
                      <input
                        className="w-full px-3 py-3 mb-4 leading-tight text-gray-700 border border-[#D9D9D9] rounded-[2px] appearance-none focus:outline-none focus:shadow-outline"
                        type="text"
                        id="name"
                        defaultValue={item.value}
                        onChange={(e) =>
                          handleInputChange(item.id, e.target.value)
                        }
                      />
                    )}
                  </div>
                ))}

                {keywords?.length > 0 && (
                  <TagsInput
                    handleDataChange={handleDataChange}
                    Defaulkeywords={keywords}
                  />
                )}

                <div className="flex flex-wrap items-center justify-center gap-4 pt-10">
                  {banner &&
                    Object?.entries(banner)?.map((item) => (
                      <div
                        key={item.id}
                        className={
                          selectedBanners[Object.values(item)[0]]
                            ? "w-[200px] h-[300px] flex flex-col items-center justify-center gap-4 border border-black px-4 rounded-[10px] cursor-pointer"
                            : "w-[200px] h-[300px] flex flex-col items-center justify-center gap-4 border px-4 rounded-[10px] cursor-pointer"
                        }
                        onClick={() => toggleBannerItem(Object.values(item)[0])}
                      >
                        <img
                          className="object-cover !w-[190px] !h-[210px] "
                          src={`https://placehold.co/${Object.values(item)[1]}`}
                        />

                        <div className="flex items-center">
                          <input
                            className="ml-2 border"
                            type="number"
                            value={
                              (inputsValue &&
                                item &&
                                inputsValue[Object.values(item)[0]]) ||
                              ""
                            }
                            placeholder="Enter CPC"
                            onChange={(e) => {
                              if (
                                e.currentTarget.value != "" ||
                                e.currentTarget.value != " "
                              ) {
                                setInputsValue({
                                  ...inputsValue,
                                  [Object.values(item)[0]]:
                                    e.currentTarget.value,
                                });
                              }
                            }}
                          />
                          <button
                            className="p-2 rounded-[10px] bg-blue-300"
                            onClick={() =>
                              handleAddCPCValue(
                                Object.values(item)[0],
                                Object.values(item)[1]
                              )
                            }
                          >
                            +
                          </button>
                        </div>

                        {/* Display the CPC values for the specific itemId */}
                        {Array.isArray(
                          selectedBanners[Object.values(item)[0]]
                        ) && (
                          <div className="mt-2">
                            {selectedBanners[Object.values(item)[0]].map(
                              (cpcValue, index) => (
                                <div key={index}>{cpcValue}</div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                </div>

                <div className="flex items-center justify-end w-full">
                  <button
                    onClick={handleSubmit}
                    className="bg-[#DC3545]   w-[15%] p-3 text-white mt-8  rounded-[2px]"
                  >
                    ذخیره
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateValue;
