import React, { useEffect, useState } from "react";
import CampaignLayout from "../../../core/component/campaignLayout";
import { Input, Upload, Button, message, Progress } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import uploadedImages from "../../../component/uploadImageComponent";
import UploadImages from "../../../component/uploadImageComponent";
import PicturesWall from "../../../component/uploadImageComponent";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import SupportResponse from "../../../component/supportResponse/SupportResponse";
import { useRouter } from "next/router";
const { TextArea } = Input;

const SupportDetail = () => {
  const [dropdown1Value, setDropdown1Value] = useState("");
  const [dropdown2Value, setDropdown2Value] = useState("");
  const [textarea1Value, setTextarea1Value] = useState("");
  const [textarea2Value, setTextarea2Value] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [responseData, setResponseData] = useState();
  const router = useRouter();
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

  useEffect(() => {
    if(router.query.id){
      
      axios
      .get(`${process.env.NEXT_PUBLIC_MAIN_URL}ticket/${router.query.id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setResponseData(response.data);
       
      });
    }
  }, [router.query]);

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

    axios
      .post(
        `${process.env.NEXT_PUBLIC_MAIN_URL}ticket/${router.query.id}`,
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
      )
      .then((response) => {
        if (response.data.success == true) {
          toast.success(response.data.msg);
        }
      });

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
          <div className="flex items-end justify-end w-full pt-10">
            <Button className="bg-[#DC3545] !text-white" onClick={handleSubmit}>
              ذخیره
            </Button>
          </div>
        </div>
        {/* Response */}
        <div className="pt-4">

            <SupportResponse data={responseData}/>
          
        </div>
      </div>
    </CampaignLayout>
  );
};

export default SupportDetail;
