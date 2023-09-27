const PopupNotif = ({ isOpen, onClose, values }) => {
  if (!isOpen) {
    return null;
  }
  console.log(values);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded-md shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Entered Values</h2>
        {values.length > 0 ? (
          <ul>
            {values.map((value, index) => (
              <div key={index} className="p-2">
                <div className="flex flex-col-reverse items-center justify-between border rounded-[10px] w-100 p-2">
                  {Object.values(value.value).map((item) => {
                    return <li>CPC:{item}</li>;
                  })}
                  <div className="flex flex-col">
                    <li>Size:{value.size}</li>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <p>No values entered.</p>
        )}
        <button
          className="px-4 py-2 text-white bg-red-500 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PopupNotif;
