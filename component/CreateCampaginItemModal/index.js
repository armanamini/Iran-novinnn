import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import AnotherModal4 from "../AnotherModal4";
import Cookies from "js-cookie";
import CustomSelect from "../CustomSelectTag";
import CreateValue from "../CreateValue";
import Stepper from "../stepper";

const CreateCampaginItemModal = ({
  isOpen,
  onClose,
  onSubmit,
  fetchData,
  fetchItems,
  setNewCustomFieldId3,
}) => {
  const [checked, setChecked] = useState(false);
  const [showAnotherModal, setShowAnotherModal] = useState(false); // State to manage the visibility of the AnotherModal
  const router = useRouter();
  // Step 1: New state to manage the visibility of custom select options
  const [showCustomOptions, setShowCustomOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [nameError, setNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [priceTypeError, setPriceTypeError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showUploadedImage, setShowUploadedImage] = useState(false);
  const [localis, setLocalIs] = useState();
  const [typeMode, setTypeMode] = useState(null);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    price_type: "",
    price_count: "",
    extra_option_price: "",
    domain: "",
  });
  const [stepsStyle, setStepsStyle] = useState(1);

  useEffect(() => {
    const shit = JSON.parse(localStorage?.getItem("token"));

    setLocalIs(Object.entries(shit?.campaign_type_mode));

    console.log(localis);
  }, []);

  const handleSaveOption = (option) => {
    setSelectedOptions((prevOptions) => [...prevOptions, option]);
  };
  const [userData, setUserData] = useState([]);

  const toggleCustomOptions = () => {
    setShowCustomOptions((prevState) => !prevState);
  };

  // Step 3: Handle custom option selection
  const handleCustomOptionSelect = (optionValue) => {
    setFormData((prevState) => ({
      ...prevState,
      price_type: optionValue,
    }));
    setShowCustomOptions(false); // Close the dropdown menu when an option is selected
  };

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.NEXT_PUBLIC_Main_URL}/uac`)
  //     .then((response) => {
  //       setUserData(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    let newValue = type === "checkbox" ? (checked ? 1 : 0) : value;

    // If the field being updated is selectedOptions, parse it to JSON
    if (name === "selectedOptions") {
      newValue = JSON.parse(newValue);
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };
  useEffect(() => {
    const extraOptionPriceJSON = JSON.stringify(selectedOptions);

    // Update the formData with the serialized selectedOptions
    setFormData((prevState) => ({
      ...prevState,

      extra_option_price: extraOptionPriceJSON,
    }));
  }, [selectedOptions]);

  const handleSubmit = () => {
    if (!formData.name) {
      setNameError(true);
    } else {
      setNameError(false);
    }

    if (!formData.price) {
      setPriceError(true);
    } else {
      setPriceError(false);
    }

    if (!formData.price_type) {
      setPriceTypeError(true);
    } else {
      setPriceTypeError(false);
    }

    // If any of the required fields is empty, prevent form submission
    if (!formData.name || !formData.price || !formData.price_type) {
      return;
    }

    // Serialize the selectedOptions array to a JSON string
    console.log(formData);

    axios
      .post(
        `${process.env.NEXT_PUBLIC_MAIN_URL}campaign-type-item`,
        { ...formData, campaign_type_id: typeMode },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          fetchItems();
          setNewCustomFieldId3(response.data.id);
          toast.success(response.data.msg);
          router.push("/mediaList");
        } else {
          toast.error(response.data.msg);
        }
        console.log(response);
      })
      .catch(() => {});
  };

  const handleShowAnotherModal = () => {
    setShowAnotherModal(!showAnotherModal);
  };

  const handleMainChange = (e) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    const parentIdValue = isChecked ? "0" : "";
    setFormData((prevState) => ({
      ...prevState,
      parent_id: parentIdValue,
    }));
  };

  const isCpcSelected = formData.price_type === "1"; // Check if the "cpc" option is selected

  const handleImageChange = async (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile);

    if (imageFile) {
      const formData = new FormData();
      formData.append("img", imageFile);

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_MAIN_URL}campaign-type-item/upload-image`,
          formData
        );

        if (response.data.success) {
          const { name, url } = response.data; // Extract the image name from the response
          setFormData((prevState) => ({
            ...prevState,
            primary_image: url, // Save the image name in formData
          }));
          setTimeout(() => {
            setShowUploadedImage(true);
          }, 8000);
          // Handle the response as needed
          console.log("Upload response:", response.data);
        } else {
          console.error("Image upload failed.");
        }
      } catch (error) {
        // Handle errors
        console.error("Error uploading image:", error);
      }
    }
  };
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_MAIN_URL}campaign-type`)
      .then((response) => {
        setData(response.data);
      });
  }, []);

  return (
    <>
      {/* all step one */}
      <div className={stepsStyle == 2 ? "absolute left-[100%]" : ""}>
        <div className="w-[50rem] mx-auto pb-36 pt-10">
          <div className="relative w-auto mx-auto my-6">
            <div className="bg-white  rounded-[16px] px-4 shadow-sm outline-none focus:outline-none">
              <div className="flex items-center p-5 border-b border-solid rounded-t border-[#A5A3A3] border-opacity-80">
                <h3 className="text-[24px] ">ساخت رسانه جدید</h3>
              </div>
              <div className="relative flex-auto p-6">
                <div>
                  <label
                    className={`block mb-2 text-[14px] text-black text-opacity-80`}
                  >
                    نام <span className="text-[#DC3545]">*</span>
                  </label>
                  <input
                    className={`w-full px-3 py-3 mb-1 leading-tight text-gray-700 border ${
                      nameError ? "border-[#DC3545]" : "border-[#D9D9D9]"
                    } rounded-[2px] appearance-none focus:outline-none focus:shadow-outline`}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {nameError && (
                    <span className="text-[#DC3545] font-[400] text-sm">
                      نام را وارد کنید
                    </span>
                  )}

                  <label
                    className={`block mb-2 mt-4 text-[14px] text-black text-opacity-80`}
                  >
                    لینک <span className="text-[#DC3545]">*</span>
                  </label>
                  <input
                    className={`w-full px-3 py-3 mb-1 leading-tight text-gray-700 border ${
                      nameError ? "border-[#DC3545]" : "border-[#D9D9D9]"
                    } rounded-[2px] appearance-none focus:outline-none focus:shadow-outline`}
                    type="text"
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                  />

                  {nameError && (
                    <span className="text-[#DC3545] font-[400] text-sm">
                      لینک را وارد کنید
                    </span>
                  )}

                  {/*this div is for uploading image  */}
                  <div className="mb-4">
                    <label
                      htmlFor="image2"
                      className="block text-gray-700 font-[14px] mb-2"
                    >
                      تصویر
                    </label>

                    <div className="flex items-center">
                      <input
                        type="file"
                        id="image2"
                        onChange={handleImageChange}
                        className="hidden"
                      />

                      <label
                        htmlFor="image2"
                        className=" flex items-center gap-x-2 border border-[#D9D9D9]  text-white font-bold py-2 px-4 rounded  cursor-pointer"
                      >
                        <p className="text-[#555555d9] font-[300px] !text-opacity-90">
                          Upload
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="#555555d9"
                          class="w-4 h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                          />
                        </svg>
                      </label>
                      {formData.primary_image && showUploadedImage ? (
                        <div className="relative w-20 h-20 mr-4">
                          <img
                            src={formData.primary_image}
                            alt="sssss"
                            className="w-full h-full "
                          />
                          <svg
                            onClick={() => {
                              setFormData((prevState) => ({
                                ...prevState,
                                primary_image: "", // Clear the primary_image
                              }));
                              setSelectedImage(null); // Clear the selected image
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-4 h-4 absolute cursor-pointer -right-2 -top-2"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                      ) : formData.primary_image && !showUploadedImage ? (
                        <div>loading...</div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <select
                      className="w-full p-4 border rounded-[4px]"
                      onChange={(e) => {
                        setTypeMode(e.target.value);
                      }}
                    >
                      {/* {localis?.map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))} */}

                      {data.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}

                      {/* <option value="1">استوری اینستاگرام</option>
                  <option value="2"> پست اینستاگرام</option>
                  <option value="3"> تبلیغ کلیکی</option>
                  <option value="4"> رپورتاژ آگهی</option>
                  <option value="5"> کانال تلگرام</option> */}
                    </select>
                  </div>
                  {/*end this div is for uploading image  */}

                  <label
                    className={`block mb-2 text-[14px] mt-4 text-black text-opacity-80`}
                  >
                    قیمت <span className="text-[#DC3545]">*</span>
                  </label>
                  <input
                    className={`w-full px-3 py-3 mb-1 leading-tight text-gray-700 border ${
                      priceError ? "border-[#DC3545]" : "border-[#D9D9D9]"
                    } rounded-[2px] appearance-none focus:outline-none focus:shadow-outline`}
                    type="text"
                    id="icon"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                  {priceError && (
                    <span className="text-[#DC3545] font-[400] text-sm">
                      قیمت را وارد کنید
                    </span>
                  )}

                  <div>
                    <label className={`block mb-2 mt-4  text-gray-700`}>
                      نوع پرداخت{" "}
                      <span className="text-[#DC3545] font-[400]">*</span>
                    </label>
                    {/* Step 2: Use a button to show/hide custom select options */}
                    <button
                      className={`w-full px-3 py-2 mb-2 text-right leading-tight text-[14px] ${
                        priceTypeError
                          ? "border border-red-500"
                          : "text-[#00000040]"
                      } border rounded-[2px] appearance-none focus:outline-none focus:shadow-outline`}
                      onClick={toggleCustomOptions}
                      disabled={checked}
                    >
                      {formData.price_type === ""
                        ? "نوع پرداخت را انتخاب کنید"
                        : formData.price_type === "1"
                        ? "cpc"
                        : "spot"}
                    </button>
                    {priceTypeError && (
                      <span className="text-[#DC3545] font-[400] text-sm">
                        نوع پرداخت را انتخاب کنید
                      </span>
                    )}

                    {/* Step 3: Implement the custom options */}
                    {showCustomOptions && (
                      <ul
                        className="bg-white border rounded-[2px] absolute z-10 w-[93.6%]"
                        onClick={() => setShowCustomOptions(false)} // Close the dropdown menu when clicked outside
                      >
                        <li
                          className="px-4 hover:border-r-2 hover:border-[#1890FF] hover:bg-[#FEF9F9] py-2  cursor-pointer"
                          onClick={() => handleCustomOptionSelect("1")}
                        >
                          cpc
                        </li>
                        <li
                          className="px-4 hover:border-r-2 hover:border-[#1890FF] hover:bg-[#FEF9F9] py-2  cursor-pointer"
                          onClick={() => handleCustomOptionSelect("2")}
                        >
                          spot
                        </li>
                      </ul>
                    )}
                  </div>

                  {/* Conditionally render the "price_count" input field */}
                  {isCpcSelected && (
                    <>
                      <label className="block mt-5 mb-2 font-bold text-gray-700">
                        مقدار cpc
                      </label>
                      <input
                        className="w-full px-3 py-2 mb-4 leading-tight text-gray-700 border appearance-none rounded-2px focus:outline-none focus:shadow-outline"
                        type="text"
                        name="price_count"
                        value={formData.price_count}
                        onChange={handleChange}
                      />
                    </>
                  )}
                  <svg
                    onClick={handleShowAnotherModal}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="#177737"
                    class="w-10 h-10 cursor-pointer mt-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {/* list of  extra option */}
                  <table className=" w-full mb-4 mt-4   border border-[#f7f7f7]">
                    <thead>
                      <tr className="bg-[#FAFAFA] text-xs font-[400] text-black text-opacity-80 uppercase tracking-wider">
                        <th className="px-6 py-4 w-[100px] h-[50px] text-right text-[14px] align-top border-l border-[#f7f7f7]">
                          نام
                        </th>
                        <th className="px-6 py-4 w-[100px] h-[50px] text-right text-[14px] align-top border-l border-[#f7f7f7]">
                          قیمت
                        </th>
                      </tr>
                    </thead>
                    {selectedOptions.length == 0 ? (
                      <p className="text-black text-center  absolute w-[93.5%] mt-4 mb-4 mx-auto">
                        آپشنی وجود ندارد
                      </p>
                    ) : (
                      <tbody className="bg-white divide-y divide-[#f7f7f7]">
                        {selectedOptions.map((item) => (
                          <tr className="divide-x divide-[#f7f7f7]">
                            <td className="px-6 py-4 text-black text-right align-top border-l  border-[#f7f7f7]">
                              {item.name}
                            </td>

                            <td className="px-6 py-4 text-black text-right align-top border-l border-[#f7f7f7]">
                              {item.price}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                  {showAnotherModal && (
                    <AnotherModal4
                      isOpen={showAnotherModal}
                      onClose={handleShowAnotherModal}
                      handleSaveOption={handleSaveOption}
                    />
                  )}

                  {/* <div className="flex items-center justify-end w-full mt-4">
                  <button
                    className="bg-[#DC3545] w-[15%] p-3 text-white rounded-[2px]"
                    onClick={handleSubmit}
                  >
                    بعدی
                  </button>
                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*end all step one */}

      {/* all step two */}
      <div
        className={
          stepsStyle == 2
            ? "relative mx-auto pb-10 w-full"
            : "absolute left-[100%]"
        }
      >
        <CreateValue
          isOpen={stepsStyle == 2}
          id={typeMode}
          formData={formData}
        />
      </div>
      {/* end all step two */}

      <div className="sticky bottom-0 w-full bg-[#8aa5ff] p-2">
        <div className="flex items-center justify-between w-full">
          <div
            className="p-3 bg-white rounded-[10px] cursor-pointer"
            onClick={() => {
              setStepsStyle((prev) => prev - 1);
            }}
          >
            <button>قبلی</button>
          </div>

          {stepsStyle != 2 && (
            <div
              className="p-3 bg-white rounded-[10px] cursor-pointer"
              onClick={() => {
                if (typeMode == null) {
                  toast.warning("تایپ کمپین را انتخاب کنید");
                } else {
                  setStepsStyle((prev) => prev + 1);
                }
              }}
            >
              <button>بعدی</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateCampaginItemModal;
