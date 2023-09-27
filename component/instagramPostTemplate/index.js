import React, { useState } from "react";

// import { FiMessageSquare, FaHeart } from 'react-icons/all';

const InstagramPostTemplate = ({ previewImage,textArea }) => {
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [tags, setTags] = useState("");

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  return (
    <div className="w-[350px] mx-auto overflow-hidden">
      <div className="w-full mx-auto border rounded-[5px]">
        <div className="mb-4  minh-[520px] ">
          <div className="border-b h-[60px]">
            <div className="flex flex-row-reverse items-center justify-between w-full h-full px-4">
              <img
                src="/images/launch9_copy.png"
                className="!w-[50px] !h-[50px] object-contain rounded-full "
              />

              <img
                src="/icons/download (1).png"
                className="!w-[20px] object-contain"
              />
            </div>
          </div>
          {previewImage ? (
            <img src={previewImage} className="object-contain !h-[500px]" />
             ) : (
            <div className="!h-[500px] bg-gray-300"></div>
             )}
           <div className="flex flex-row-reverse items-center justify-between w-full px-4">
            <div className="flex flex-row-reverse items-center justify-center gap-2 pt-4">
              <img src="/icons/like.0e4b398.png" className="!w-[20px]" />
              <img src="/icons/comment.97c4a96.png" className="!w-[20px]" />
              <img src="/icons/share.e014464.png" className="!w-[20px]" />
            </div>
            <img src="/icons/download.png" className="!w-[20px] pt-4" />
          </div>

          <div className="w-full">
            <div className="flex flex-wrap items-center justify-end w-full gap-2 px-4 pt-4">
              <p
                className="font-[600]"
                style={{
                  fontFamily: "sans-serif",
                }}
              >
                launch
              </p>
              <p className="w-full text-justify ">{textArea}</p>

            </div>
            <p
              className="px-4 pt-2 text-[10px] text-end"
              style={{
                fontFamily: "sans-serif",
              }}
            >
              4 HOURS AGO
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramPostTemplate;
