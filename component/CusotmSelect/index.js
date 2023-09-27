import React, { useEffect, useState } from "react";

const CustomSelect = ({
  label,
  options,
  value,
  onChange,
  selectedOptionId,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    onChange(option.id);
    selectedOptionId(option.id);
  };

  const selectedOption = options.find((option) => option.id === value);

  return (
    <div className="relative inline-block w-full">
      <button
        onClick={toggleDropdown}
        className="flex justify-between w-full p-4 px-8 leading-tight rounded-md text-start focus:outline-none focus:border-blue-500"
      >
        <p className="text-[16px] font-[600]">
          {selectedOption ? selectedOption.value : label}
        </p>
        {!isOpen ? (
          <svg
            className="w-4 h-4 pointer-events-none fill-current "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4 pointer-events-none fill-current "
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.46477 5.64866C1.07424 6.03919 1.07424 6.67235 1.46477 7.06288C1.85529 7.4534 2.48846 7.4534 2.87898 7.06288L5.00028 4.94158L7.1216 7.0629C7.51212 7.45343 8.14529 7.45343 8.53581 7.0629C8.92633 6.67238 8.92633 6.03921 8.53581 5.64869L5.71349 2.82637C5.71147 2.82432 5.70945 2.82228 5.70741 2.82024C5.32299 2.43581 4.70345 2.42981 4.31168 2.80222C4.30546 2.80813 4.2993 2.81414 4.2932 2.82024C4.29319 2.82025 4.29318 2.82025 4.29317 2.82026C4.2931 2.82033 4.29303 2.8204 4.29296 2.82047L1.46477 5.64866Z"
              fill="black"
              fill-opacity="0.85"
            />
          </svg>
        )}
      </button>
      {isOpen && (
        <div className=" right-0 w-full mt-2 origin-top-right z-10 !bg-white rounded-md ring-black ring-opacity-5 focus:outline-none">
          {options?.map((option) => (
            <button
              key={option.value}
              onClick={() => handleOptionClick(option)}
              className="block w-full px-4 py-2 text-sm text-left hover:border-[#1890FF] hover:border-r-[3px] text-gray-700 hover:bg-[#E6F7FF] hover:text-white"
            >
              <p className="hover:text-[#1890FF] p-2 text-start ">
                {option.label}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
