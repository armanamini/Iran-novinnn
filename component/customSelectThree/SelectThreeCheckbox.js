import React, { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const SelectCheckboxWithSubmenu = () => {
  const [submenu1Open, setSubmenu1Open] = useState(false);
  const [submenu2Open, setSubmenu2Open] = useState(false);
  const [submenu3Open, setSubmenu3Open] = useState(false);

  const handleMainCheckboxChange = (submenu) => {
    switch (submenu) {
      case "submenu-1":
        setSubmenu1Open(!submenu1Open);
        break;
      case "submenu-2":
        setSubmenu2Open(!submenu2Open);
        break;
      case "submenu-3":
        setSubmenu3Open(!submenu3Open);
        break;
      default:
        break;
    }
  };

  const ChevronIcon = ({ open }) =>
    open ? (
      <AiOutlineUp className="w-4 h-4" />
    ) : (
      <AiOutlineDown className="w-4 h-4" />
    );

  return (
    <div className="p-4 space-y-4">
      <div
        className="flex items-center justify-between space-x-2 cursor-pointer"
        onClick={() => handleMainCheckboxChange("submenu-1")}
      >
        <div className="flex items-center justify-center gap-3">
          <input
            type="checkbox"
            className="w-5 h-5 form-checkbox !outline-[#D9D9D9]"
          />
          <span className="text-[#00000040]">کسب و کار</span>
        </div>
        <ChevronIcon open={submenu1Open} />
      </div>
      {submenu1Open && (
        <div className="ml-6 mr-16 space-y-2">
          <label className="flex items-center gap-2 space-x-2">
            <input type="checkbox" className="w-5 h-5 form-checkbox" />
            <span className="pl-2 text-[#00000040]">کارآفرینی و استارتاپ</span>
          </label>
          <label className="flex items-center gap-2 space-x-2">
            <input type="checkbox" className="w-5 h-5 form-checkbox" />
            <span className="pl-2 text-[#00000040]"> بازاریابی و تبلیغات</span>
          </label>
          <label className="flex items-center gap-2 space-x-2">
            <input type="checkbox" className="w-5 h-5 form-checkbox" />
            <span className="pl-2 text-[#00000040]"> شبکه های اجتماعی</span>
          </label>
        </div>
      )}

      <div
        className="flex items-center justify-between space-x-2 cursor-pointer"
        onClick={() => handleMainCheckboxChange("submenu-2")}
      >
        <div className="flex items-center justify-center gap-3">
          <input type="checkbox" className="w-5 h-5 form-checkbox" />
          <span className="text-[#00000040]">خانه و سبک زندگی</span>
        </div>
        <ChevronIcon open={submenu2Open} />
      </div>
      {submenu2Open && (
        <div className="ml-6 mr-16 space-y-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="w-5 h-5 form-checkbox" />
            <span className="pl-2 text-[#00000040]">Submenu Item 2-1</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="w-5 h-5 form-checkbox" />
            <span className="pl-2 text-[#00000040]">Submenu Item 2-2</span>
          </label>
        </div>
      )}
    </div>
  );
};

export default SelectCheckboxWithSubmenu;
