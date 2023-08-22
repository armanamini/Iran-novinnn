import React, { useState, useEffect } from 'react';

const RangeSlider = ({
  min,
  max,
  defaultValue,
  onChangeStart,
  onChangeEnd,
  value: mainValueRange,
}) => {
  const [sliderValue, setSliderValue] = useState(defaultValue);

  const handleChange = (event) => {
    const newValue = [...sliderValue];
    const handleIndex = parseInt(event.target.dataset.handleIndex);
    newValue[handleIndex] = parseInt(event.target.value);
    setSliderValue(newValue);
  };

  useEffect(() => {
    if (onChangeStart) {
      onChangeStart(sliderValue);
    }
  }, [sliderValue, onChangeStart]);

  useEffect(() => {
    if (onChangeEnd) {
      onChangeEnd(sliderValue);
    }
  }, [sliderValue, onChangeEnd]);

  return (
    <div className="flex items-center justify-center h-screen">
      <input
        type="range"
        min={min}
        max={max}
        value={sliderValue[0]}
        onChange={handleChange}
        data-handle-index={0}
        className="z-10 w-1/2 h-1 bg-gray-300 rounded-lg appearance-none"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={sliderValue[1]}
        onChange={handleChange}
        data-handle-index={1}
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
