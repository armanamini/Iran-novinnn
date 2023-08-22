// components/RangeSlider.js
import React, { useState } from 'react';

const RangeSlider = () => {
  const [sliderValue, setSliderValue] = useState([20, 37]);

  const handleChange = (event) => {
    const newValue = [...sliderValue];
    const handleIndex = event.target.dataset.handleIndex;
    newValue[handleIndex] = parseInt(event.target.value);
    setSliderValue(newValue);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <input
        type="range"
        min="0"
        max="100"
        value={sliderValue[0]}
        onChange={handleChange}
        data-handle-index="0"
        className="z-10 w-1/2 h-1 bg-gray-300 rounded-lg appearance-none"
      />
      <input
        type="range"
        min="0"
        max="100"
        value={sliderValue[1]}
        onChange={handleChange}
        data-handle-index="1"
        className="z-10 w-1/2 h-1 bg-gray-300 rounded-lg appearance-none"
      />
      <div className="absolute left-0 transform -translate-y-1/2 top-1/2">
        {sliderValue[0]}
      </div>
      <div className="absolute right-0 transform -translate-y-1/2 top-1/2">
        {sliderValue[1]}
      </div>
    </div>
  );
};

export default RangeSlider;