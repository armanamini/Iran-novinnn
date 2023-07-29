import React from 'react';

const SupportResponse = ({ data }) => {
  let ticketReplies = [];

  try {
    if (data?.ticketreplys) {
      ticketReplies = JSON.parse(data.ticketreplys);
    }
  } catch (error) {
    console.error('Error parsing ticket replies JSON:', error);
  }

  return (
    <div className="border rounded-[4px] mb-4 bg-[#F9FAFF] p-4">
      <div className="p-4">
        <h3 className="text-[24px]">{data?.title}</h3>
      </div>
      <div className="p-4 bg-white">
        {ticketReplies.map((item) => (
          <p key={item.text}>{item.text}</p>
        ))}
      </div>
    </div>
  );
};

export default SupportResponse;
