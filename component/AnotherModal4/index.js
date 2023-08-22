import React, { useState } from "react";
import { toast } from "react-toastify";
import CampaignLayout from "../../core/component/campaignLayout";

const AnotherModal4 = ({
  isOpen,
  onClose,
  handleSaveOption,
  fetchData,
  fetchCustomFields,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleSaveClick = () => {
    if (name.trim() === "" || price.trim() === "") {
      toast.error("هر دو فیلد را پر کنید");
    } else {
      // Save the selected option
      const option = { name, price };
      handleSaveOption(option);

      // Close the second modal
      onClose();
    }
  };

  return (
    <div className="absolute">
      {isOpen && (
        <div className="fixed inset-0 z-50 max-w-[35rem] mx-auto mt-40 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto mx-auto my-6">
            <div className="bg-white rounded-[16px] px-4 shadow-sm outline-none focus:outline-none">
              <div className="flex items-center p-5 border-b border-solid rounded-t border-[#A5A3A3] border-opacity-80">
                <button
                  className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none focus:outline-none"
                  onClick={onClose}
                >
                  <span className="block w-6 h-6 text-2xl text-black outline-none focus:outline-none">
                    ×
                  </span>
                </button>
                <h3 className="text-[24px]"> قیمت گذاری </h3>
              </div>
              <div className="relative flex-auto p-6">
                <div>
                  <label className="block mb-2 text-right text-[14px] text-black text-opacity-80">
                    نام<span className="text-[#DC3545]">*</span>
                  </label>
                  <input
                    className="w-full px-3 py-3 mb-4 leading-tight text-gray-700 border border-[#D9D9D9] rounded-[2px] appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                  />

                  <label className="block mb-2 text-[14px] text-right text-black text-opacity-80">
                    قیمت<span className="text-[#DC3545]">*</span>
                  </label>
                  <input
                    className="w-full px-3 py-3 mb-4 leading-tight text-gray-700 border border-[#D9D9D9] rounded-[2px] appearance-none focus:outline-none focus:shadow-outline"
                    type="text"
                    value={price}
                    onChange={handlePriceChange}
                  />

                  <div className="flex items-center justify-end w-full">
                    <button
                      className="bg-[#DC3545] w-[15%] p-3 text-white rounded-[2px]"
                      onClick={handleSaveClick}
                    >
                      ذخیره
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isOpen && <div className="fixed inset-0 z-40 bg-black opacity-25"></div>}
    </div>
  );
};

export default AnotherModal4;
