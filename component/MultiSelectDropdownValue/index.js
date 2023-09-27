import React, { useState, useEffect, useRef } from "react";

const MultiSelectDropdownValue = ({
  options,
  onChange,
  defaultSelectedOptionIds,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(
    defaultSelectedOptionIds
  );
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option.cfo_id)) {
      setSelectedOptions(selectedOptions.filter((id) => id !== option.cfo_id));
    } else {
      setSelectedOptions([...selectedOptions, option.cfo_id]);
    }
  };

  useEffect(() => {
    // Call the onChange prop with selected option IDs
    if (typeof onChange === "function") {
      onChange(selectedOptions);
    }
  }, [selectedOptions]);
  const handleRemoveOption = (option) => {
    setSelectedOptions(selectedOptions.filter((id) => id !== option.cfo_id));
  };

  const filteredSelectedOptions = selectedOptions.filter((id) => !isNaN(id));

  const filteredOptions = options?.filter((option) =>
    option?.cfo_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative w-full mb-4" ref={dropdownRef}>
      {defaultSelectedOptionIds.length > 0 && (
        <div
          className={`w-full bg-white border border-[#D9D9D9] rounded-[2px] shadow-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
            filteredSelectedOptions.length > 5 ? "pt-6 pb-2" : "py-3 px-4"
          }`}
          onClick={toggleDropdown}
        >
          {filteredSelectedOptions.length === 0 ? "انتخاب کنید ..." : null}
          {filteredSelectedOptions.map((selectedOptionId) => {
            const selectedOption = options.find(
              (option) => option.cfo_id === selectedOptionId
            );
            return (
              <span
                key={selectedOption?.cfo_id}
                className="inline-flex items-center mb-1 px-2.5 py-1.5 rounded-md bg-blue-400 text-white text-xs font-medium mx-1"
              >
                {selectedOption?.cfo_name}
                <button
                  type="button"
                  onClick={() => handleRemoveOption(selectedOption)}
                  className="mr-2 text-red-500 text-[16px]"
                >
                  x
                </button>
              </span>
            );
          })}
        </div>
      )}
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-md shadow-lg">
          <div className="px-4 py-2">
            <input
              type="text"
              className="w-full focus:outline-none placeholder:text-[#cac9c967] border border-gray-200 rounded-md py-2 px-3"
              placeholder="جست و جو کنید"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {filteredOptions?.map((option) => (
            <label
              key={option.cfo_id}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 form-checkbox"
                checked={selectedOptions.includes(option.cfo_id)}
                onChange={() => handleOptionClick(option)}
              />

              <span className="mr-3 text-sm">{option.cfo_data}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdownValue;
