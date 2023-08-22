import React, { useState } from "react";

const CustomSelect = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState({
    value: "انتخاب کنید"
  });
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    const selectedOption = JSON.parse(selectedValue);
    setSelectedOption(selectedOption);
    onChange(event); // Call the parent component's onChange function
    closeDropdown();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative w-full">
      <div
        className="w-full p-1 rounded-[2px] bg-white  py-2 flex items-center justify-between px-4 cursor-pointer"
        onClick={toggleDropdown}
      >
        {selectedOption.value}
        <div className="pointer-events-none">
          <svg
            className={`w-4 h-4 transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {isDropdownOpen && (
        <div className="absolute z-20 w-full bg-white border rounded shadow">
          <ul>
            {options.map((option) => (
              <li
                key={option.id}
                onClick={() =>
                  handleOptionChange({
                    target: { value: JSON.stringify(option) },
                  })
                }
                className={`cursor-pointer px-4 py-2 hover:border-r-[3px] hover:bg-[#FEF9F9] hover:text-black hover:border-[#DC3545] ${
                  selectedOption.id === option.id
                    ? " border-r-[3px] bg-[#FEF9F9] border-[#DC3545] text-black"
                    : ""
                }`}
              >
                {option.value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
