import React, { useState } from "react";
import SelectThreeCheckbox from "../customSelectThree/SelectThreeCheckbox";
import SelectCheckboxWithSubmenu from "../customSelectThree/SelectThreeCheckbox";

const CustomSelectCategory = ({label}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: "دواستوری", label: "دواستوری"},
    { value: "بیش از دواستور", label: "بیش از دواستوری" },

  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-full">
      <button
        onClick={toggleDropdown}
        className="flex justify-between w-full p-4 px-8 leading-tight rounded-md text-start focus:outline-none focus:border-blue-500"
      >
        <p className="text-[16px] font-[600]">
            
        {selectedOption ? selectedOption.label : label}
        </p>
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
      </button>
      {isOpen && (
        <SelectCheckboxWithSubmenu/>
      )}
    </div>
  );
};

export default CustomSelectCategory;
