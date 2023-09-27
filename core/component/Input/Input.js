import React, { useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";

const Input = ({
  onChange,
  value,
  title,
  desc,
  typeInput,
  placeholder,
  edit,
  name,
  className,
  classNameInput,
  label,
  id,
  min,
  max,
  step,
  maxLength,
  type,
  number,
  showPassword,
  required,
  classNameCard,
  checked,
  multiple 
}) => {
  const [isPassword, setIspassword] = useState(false);

  switch (type) {
    case "easy":
      return (
        <div className={`flex flex-col gap-1 ${className}`}>
          <label className="text-base !text-[14px]">
            {label}
            {required === true && <span className={`text-red2F`}>*</span>}
          </label>
          <div className={`flex rounded-md relative  ${classNameCard}`}>
            <input
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              type={typeInput}
              className={`${classNameInput}  border-[#D9D9D9] px-2 !border !rounded-[4px] outline-none w-full py-2`}
              name={name}
            />
          </div>
        </div>
      );                        
    case "normal":
      return (
        <div className={`flex flex-col gap-2 ${className}`}>
          <label className="text-lg">
            {label}
            {required === true && <span className={`text-green54`}>*</span>}
          </label>
          <div
            className={`flex bg-grayF3 px-2 py-3 rounded-lg relative ${classNameCard}`}
          >
            <p className="absolute top-0 bottom-0 right-0 px-1 py-2 rounded-r-lg bg-green72"></p>
            <input
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              type={typeInput}
              className={`${classNameInput} bg-grayF3 h-full outline-none w-full px-2`}
              name={name}
            />
          </div>
        </div>
      );
    case "checkbox":
      return (
        <div className="flex flex-row items-center gap-1 cursor-pointer">
          <label for={id} className="text-sm text-gray72">
            {label}
          </label>
          <div className="flex items-center justify-center ">
            <input
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              checked={checked}
              type={"checkbox"}
              className={`${classNameInput} appearance-none border-[1.5px] outline-none checked:bg-green54 border-green54 w-4 h-4 rounded-sm`}
              name={name}
              id={id}
            />
          </div>
        </div>
      );
    case "file":
      return (
        <div className={`flex flex-col gap-1 ${className}`}>
          <div
            className={`!border !rounded-[2px] border-[#D9D9D9] outline-none w-full py-2 ${classNameCard}`}
          >
            <label for="actual-btn" className="p-4 text-gray bg-green54">
              فایل های ضمیمه را انتخاب کنید
            </label>
            <input
              id="actual-btn"
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              type={typeInput}
              className={`${classNameInput} !border border-[#D9D9D9] !rounded-[2px] outline-none w-full`}
              name={name}
              hidden
              multiple={multiple}
              required={required}
            />
          </div>
        </div>
      );
    case "radio":
      return (
        <div
          className={`flex flex-row items-center gap-1 cursor-pointer ${className}`}
        >
          <label for={id} className="text-sm text-gray72">
            {label}
          </label>
          <div className="flex items-center justify-center ">
            <input
              value={value}
              onChange={onChange}
              type={"radio"}
              className={`${classNameInput} appearance-none border-[1.5px] outline-none checked:bg-green54 border-green54 w-4 h-4 rounded-sm`}
              name={name}
              id={id}
            />
          </div>
        </div>
      );
    case "password":
      return (
        <div className="flex flex-col gap-2">
          <label className="text-lg">{label}</label>
          <div className="relative flex px-2 py-3 rounded-lg bg-grayF3">
            <p className="absolute top-0 bottom-0 right-0 px-1 py-2 rounded-r-lg bg-green72"></p>
            <input
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              type={isPassword ? "text" : "password"}
              className={`${classNameInput} bg-grayF3 h-full outline-none w-full px-2`}
              name={name}
            />
            {showPassword ? (
              <BsFillEyeFill
                onClick={() => {
                  setIspassword(!isPassword);
                }}
                className="absolute text-xl top-2/4 left-4 bottom-2/4 -translate-y-2/4 text-gray72"
              />
            ) : (
              ""
            )}
          </div>
        </div>
      );
    case "normal_number":
      return (
        <div className="flex flex-col gap-2">
          <label className="text-lg">{label}</label>
          <div className="relative flex px-2 py-3 overflow-hidden rounded-lg bg-grayF3">
            <p className="absolute top-0 bottom-0 right-0 z-10 px-1 py-2 rounded-r-lg bg-green72"></p>
            <input
              required={required}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              type={typeInput}
              className={`${classNameInput} bg-grayF3 h-full relative left-16 outline-none w-full px-2 text-left`}
              name={name}
            />
            <p className="absolute top-0 bottom-0 left-0 flex items-center justify-center px-4 text-lg rounded-l-lg bg-grayE3">
              {`${parseInt(number).toLocaleString("fa-ir")}+`}
            </p>
          </div>
        </div>
      );
    case "textarea":
      return (
        <div className={`flex flex-col gap-1 ${className}`}>
          <label className="text-lg !text-[14px]">{label}</label>
          <div className="relative flex rounded-lg bg-grayF3">
            <textarea
              required={required}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              rows={"7"}
              className={`${classNameInput} bg-grayF3 border-[#D9D9D9] h-full relative outline-none w-full px-2 text-left`}
              name={name}
            />
          </div>
          <span className="text-gray-400">0/100</span>
        </div>
      );
    default:
      return (
        <div
          className={`flex flex-col justify-between items-start w-full overflow-hidden mb-4 ${className}`}
        >
          <label className={`text-green54 mb-2`}>{label}</label>
          <input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type={typeInput}
            className={`w-full overflow-auto py-2 px-2 bg-greenF8 border-2 border-green-100 rounded-md outline-none flex-1 ${classNameInput}`}
            name={name}
            min={min}
            max={max}
            maxLength={maxLength}
          />
        </div>
      );
  }
};

export default Input;
