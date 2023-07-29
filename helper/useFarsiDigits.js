const useFarsi = (input) => {
    const convertToPersianDigits = (str) => {
      const persianDigitsMap = {
        '0': '۰',
        '1': '۱',
        '2': '۲',
        '3': '۳',
        '4': '۴',
        '5': '۵',
        '6': '۶',
        '7': '۷',
        '8': '۸',
        '9': '۹',
      };
  
      return str?.toString().replace(/\d/g, (match) => persianDigitsMap[match]);
    };
  
    return convertToPersianDigits(input);
  };
  
  export { useFarsi };
  