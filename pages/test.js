// pages/index.js

import React, { useState } from 'react';

const TagsInput = () => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      setTags([...tags, inputValue.trim()]);
      setInputValue(''); // Clear the input field
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
          placeholder="Enter a tag and press Enter"
          className="px-4 py-2 border rounded-md"
        />
      </div>
      <div>
        {tags.map((tag, index) => (
          <span key={index} className="inline-flex items-center px-2 py-1 m-1 text-white bg-blue-500 rounded-md">
            {tag}
            <button onClick={() => handleTagRemove(tag)} className="px-2 py-1 ml-2 text-white bg-red-500 rounded-md">
              Remove
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-semibold">Tags Input Example with Tailwind CSS</h1>
      <TagsInput />
    </div>
  );
}
