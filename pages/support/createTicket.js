import React, { useState } from "react";
import CampaignLayout from "../../core/component/campaignLayout";
import { Input, Upload, Button, message, Progress } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import uploadedImages from "../../component/uploadImageComponent";
import UploadImages from "../../component/uploadImageComponent";
import PicturesWall from "../../component/uploadImageComponent";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
const { TextArea } = Input;

const CreateTicket = () => {
  const [dropdown1Value, setDropdown1Value] = useState("");
  const [dropdown2Value, setDropdown2Value] = useState("");
  const [textarea1Value, setTextarea1Value] = useState("");
  const [textarea2Value, setTextarea2Value] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const uploadProps = {
    name: "photo",
    multiple: true,
    showUploadList: false,
    customRequest: (options) => {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = e.target.result;
        const imageId = Math.random().toString(36).substr(2, 9);

        const uploadPromise = new Promise((resolve) => {
          let uploadProgress = 0;
          const interval = setInterval(() => {
            uploadProgress += 10;
            setUploadedImages((prevImages) =>
              prevImages.map((img) =>
                img.id === imageId ? { ...img, progress: uploadProgress } : img
              )
            );
            if (uploadProgress >= 100) {
              clearInterval(interval);
              resolve();
            }
          }, 300);
        });

        uploadPromise.then(() => {
          setUploadedImages((prevImages) => [
            ...prevImages,
            { image, id: imageId, progress: 100 },
          ]);

          setIsUploading(false);
          options.onSuccess();
        });
      };
      reader.onerror = () => {
        setIsUploading(false);
        message.error("Failed to upload image");
        options.onError();
      };
      reader.readAsDataURL(options.file);
    },
  };
  const handleDropdown1Change = (value) => {
    setDropdown1Value(value);
  };

  const handleDropdown2Change = (value) => {
    setDropdown2Value(value);
  };

  const handleTextarea1Change = (e) => {
    setTextarea1Value(e.target.value);
  };

  const handleTextarea2Change = (e) => {
    setTextarea2Value(e.target.value);
  };

  const handleSubmit = () => {
    const formData = {
      dropdown1: dropdown1Value,
      dropdown2: dropdown2Value,
      textarea1: textarea1Value,
      textarea2: textarea2Value,
      // Add other form data here if needed
    };

    axios.post(
      `${process.env.NEXT_PUBLIC_MAIN_URL}ticket`,
      {
        title: formData.textarea1,
        department_id: 2,

        priority: 1,
        text: formData.textarea2,
      },
      {
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    ).then(response=>{
        if(response.data.success == true){
            
            toast.success(response.data.msg)
        }
    })

    // Handle form submission here
    console.log("Form data:", formData);
    console.log("Form data:", formData);
    console.log("Uploaded images:", uploadedImages);
  };

  return (
    <CampaignLayout>
      <div
        className="max-w-[90rem] mx-auto mt-10 p-10"
        style={{
          boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="p-4 border rounded-[4px]">
          
        <div className="flex justify-between gap-4 mb-4">
          <div className="w-1/2 pr-2">
            <label className="block mb-2">واحد</label>
            <select
              className="w-full px-3 py-2 border rounded focus:outline-none"
              value={dropdown1Value}
              onChange={(e) => handleDropdown1Change(e.target.value)}
            >
              <option value="">انتخاب کنید</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
          <div className="w-1/2 pl-2">
            <label className="block mb-2">سرویس</label>
            <select
              className="w-full px-3 py-2 border rounded focus:outline-none"
              value={dropdown2Value}
              onChange={(e) => handleDropdown2Change(e.target.value)}
            >
              <option value="">انتخاب کنید</option>
              <option value="optionA">Option A</option>
              <option value="optionB">Option B</option>
              <option value="optionC">Option C</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2">موضوع</label>
          <TextArea
            rows={4}
            className="w-full px-3 py-2 border rounded focus:outline-none"
            value={textarea1Value}
            onChange={handleTextarea1Change}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">شرح</label>
          <TextArea
            rows={4}
            className="w-full px-3 py-2 border rounded focus:outline-none"
            value={textarea2Value}
            onChange={handleTextarea2Change}
          />
        </div>

        <div className="w-full overflow-hidden">
          <PicturesWall />
        </div>
        </div>
        
        <div className="flex items-end justify-end w-full pt-10">
          <Button className="bg-[#DC3545] !text-white" onClick={handleSubmit}>
            ذخیره
          </Button>
        </div>
      </div>
    </CampaignLayout>
  );
};

export default CreateTicket;
