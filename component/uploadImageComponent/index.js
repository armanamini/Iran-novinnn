import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Modal, Tooltip, Upload, message } from "antd";

const { Dragger } = Upload;

const PicturesWall = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChange = (info) => {
    let fileList = [...info.fileList];

    // Limit the number of uploaded files (e.g., 5)
    fileList = fileList.slice(-5);

    // Process the uploaded image list
    fileList = fileList.map((file) => {
      if (file.response) {
        // Process the response from the server if necessary
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(fileList);
  };

  const draggerProps = {
    name: "file",
    multiple: true,
    listType: "picture-card",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76", // Replace with your upload endpoint
    onChange: handleChange,
    onPreview: handlePreview,
    fileList,
  };

  return (
    <>
      <Dragger {...draggerProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          برای آپلود روی فایل کلیک کنید یا به این قسمت بکشید
        </p>
        <p className="ant-upload-hint">
          پسوندهای مجاز: png، Jpeg، Jpg، pdf حداکثر اندازه: 2M
        </p>
      </Dragger>

      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default PicturesWall;
