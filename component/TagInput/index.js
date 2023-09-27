import React, { useState } from "react";
import { useEffect } from "react";
import { MdRemoveCircle } from "react-icons/md";

const TagsInput = ({ handleDataChange, Defaulkeywords }) => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    Defaulkeywords?.map((item) => {
      setTags([item.name]);
    });
  }, [Defaulkeywords]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);

    handleDataChange(tags);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleTagRemove = (tag) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          placeholder="کلید واژه را وارد کنید"
          className="w-full px-4 py-3 border rounded-[2px] border-slate-300"
        />
      </div>
      <div>
        {/* Defaulkeywords */}
        {tags.map((tag, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-4 px-2 py-1 m-1 text-black border border-black rounded-md"
          >
            <span className="text-black">{tag}</span>
            <button
              onClick={() => handleTagRemove(tag)}
              className="ml-2 text-white bg-red-500 rounded-full "
            >
              <MdRemoveCircle />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsInput;
