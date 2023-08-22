import React, { useCallback, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import "swiper/css/pagination";
import SwiperCore, { Pagination, Navigation } from "swiper"; // Import Swiper core, pagination, and navigation
import "swiper/css/navigation"; // Import Swiper navigation styles

import CampaignCards from "../mainFlowcampaignCards";

// Install Swiper core, pagination, and navigation
SwiperCore.use([Pagination, Navigation]);

export default function SwiperItems({ data }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const swiperRef = useRef(null);

  const handleData = useCallback((e) => {
    setTotalPrice(e);
  }, []);

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <>
      <Swiper
        ref={swiperRef}
        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        className="mySwiper "
      >
        <div className="relative grid grid-cols-12 gap-2 p-4 px-8 sm:px-2 md:px-4 lg:px-6">
          {data?.map((item) => (
            <SwiperSlide className="!w-[300px]" key={item.id}>
              <CampaignCards key={item.id} data={item} handleData={handleData} />
            </SwiperSlide>
          ))}
        </div>
        <div className="swiper-navigation">
          <button
            onClick={handlePrev}
            className="swiper-button-prev bg-[#dc35454d] after:!text-[20px] !text-black p-8 rounded-full"
          ></button>
          <button
            onClick={handleNext}
            className="swiper-button-next bg-[#dc35454d] after:!text-[20px] !text-black p-8 rounded-full"
          ></button>
        </div>
      </Swiper>
    </>
  );
}
