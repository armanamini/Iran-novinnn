import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Input from "../../core/component/Input/Input";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import {
  updateTextareaValue,
  updateLinkValue,
  updateFileValue,
  updateProductUsageValue,
  updateMentionValue,
  updateHashtagValue,
  updateShouldValue,
  updateShouldNotValue,
  updateSuggestionValue,
  updateCampaignNameValue,
  updateCampaignStartTimeValue,
  updateCampaignEndTimeValue,
  updatePublicationNotesValue,
} from "../../redux/slice";
import "moment/locale/fa";
import axios from "axios";
import InstagramPostTemplate from "../instagramPostTemplate";
import DatePicker from "react-multi-date-picker";

const ContentForm = ({ customForm, banner, selectedBanner }) => {
  const [data, setData] = useState();
  const [form, setForm] = useState();
  const [validate, setValidate] = useState({
    campaignName: null,
    textArea: null,
  });
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (
      router.query.id &&
      JSON.parse(localStorage.getItem("campaign-type")) != 3
    ) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_MAIN_URL}campaign-type/custom-form?id=${router.query.id}&type_id=11`
        )
        .then((response) => {
          if (response.data?.custom_form.options) {
            setData(JSON.parse(response?.data?.custom_form.options));
            setForm(response?.data.custom_form);

            // console.log("why me ", JSON.parse(response?.data?.options));
          }
        });
    }
  }, [router.query]);

  const textareaValue = useSelector((state) => state.input.textareaValue);
  const linkValue = useSelector((state) => state.input.linkValue);
  const fileValue = useSelector((state) => state.input.fileValue);
  const ProductUsageValue = useSelector(
    (state) => state.input.ProductUsageValue
  );
  const [campaignNameValues, setCampaignNameValues] = useState([]);

  const mentionValue = useSelector((state) => state.input.mentionValue);
  const hashtagValue = useSelector((state) => state.input.hashtagValue);
  const shouldValue = useSelector((state) => state.input.shouldValue);
  const shouldNotValue = useSelector((state) => state.input.shouldNotValue);
  const suggestionValue = useSelector((state) => state.input.suggestionValue);

  const campaignNameValue = useSelector(
    (state) => state.input.campaignNameValue
  );

  const campaignStartTimeValue = useSelector(
    (state) => state.input.campaignStartTimeValue
  );
  const campaignEndTimeValue = useSelector(
    (state) => state.input.campaignEndTimeValue
  );
  const publicationNotesValue = useSelector(
    (state) => state.input.publicationNotesValue
  );
  useEffect(() => {
    if (textareaValue.length > 0) {
      setValidate((prev) => ({
        ...prev,
        textArea: true,
      }));
    } else {
      setValidate((prev) => ({
        ...prev,
        textArea: false,
      }));
    }
    if (campaignNameValue.length > 0) {
      setValidate((prev) => ({
        ...prev,
        campaignName: true,
      }));
    } else {
      setValidate((prev) => ({
        ...prev,
        campaignName: false,
      }));
    }
  }, [textareaValue, campaignNameValue]);

  const dispatch = useDispatch();
  const Campaign_type = JSON.parse(localStorage.getItem("campaign-type"));

  const handleTextareaChange = (e, formData) => {
    const updatedFormData = {
      parentId: form.id,
      typeId: formData[0].type_id,
      currentID: formData[0].cfo_id,
      value: e.target.value,
    };

    dispatch(updateTextareaValue(updatedFormData));
  };

  const handleLinkChange = (e) => {
    dispatch(updateLinkValue(e.target.value));
  };

  const handleFileChange = (event, identifier) => {
    const file = event.target.files;
    console.log("files", identifier);
    // dispatch(updateFileValue({ identifier, file }));
    selectedBanner(file);
  };


  const handleProductUsageChange = (e) => {
    dispatch(updateProductUsageValue(e.target.value));
  };

  const handleMentionChange = (e) => {
    dispatch(updateMentionValue(e.target.value));
  };

  const handleHashtagChange = (e) => {
    dispatch(updateHashtagValue(e.target.value));
  };

  const handleShouldChange = (e) => {
    dispatch(updateShouldValue(e.target.value));
  };

  const handleShouldNotChange = (e) => {
    dispatch(updateShouldNotValue(e.target.value));
  };

  const handleSuggestionChange = (e) => {
    dispatch(updateSuggestionValue(e.target.value));
  };
  const arr = [];
  const handleCampaignNameChange = (e, index) => {
    const updatedValues = [...campaignNameValues];
    updatedValues[index] = e.target.value;
    setCampaignNameValues(updatedValues);
    arr.push(updatedValues[index]);
    dispatch(updateCampaignNameValue(arr));
    console.log("arr", arr);
  };

  const handleCampaignStartTimeChange = (e) => {
    const startAndDate = {
      startDate: e[0].format("YYYY/MM/DD"),
      endDate: e[1]?.format("YYYY/MM/DD"),
    };
    dispatch(updateCampaignStartTimeValue(startAndDate));

    console.log("start", e[0].format("YYYY/MM/DD"));
    console.log("end", e[1]?.format("YYYY/MM/DD"));
  };

  const handleCampaignEndTimeChange = (e) => {
    dispatch(
      updateCampaignEndTimeValue(datePickerRefEnd.current.childNodes[0].value)
    );
  };

  const handlePublicationNotesChange = (e) => {
    dispatch(updatePublicationNotesValue(e.target.value));
  };

  // Parse the cfo_data into an array of objects
  let parsedCfoData;
  if (data?.length > 0) {
    parsedCfoData = data?.map((item) => JSON.parse(item?.cfo_data));
  } else {
    parsedCfoData = customForm?.map((item) => JSON.parse(item?.cfo_data));
  }
  console.log("customForm", customForm);

  useEffect(() => {
    if (parsedCfoData) {
      parsedCfoData.map((formData) => {
        return formData.map((item) => {
          if (getInputType(item.type_id) == "text area") {
            setValidate((prev) => ({
              ...prev,
              textArea: item.requirement,
            }));
          }
        });
      });

      parsedCfoData.map((formData) => {
        return formData.map((item) => {
          if (getInputType(item.type_id) == "text_input") {
            setValidate((prev) => ({
              ...prev,
              campaignName: item.requirement,
            }));
          }
        });
      });
    }
  }, [data, customForm]);

  // Function to get the input type based on the type_id and token
  const getInputType = (typeId) => {
    const tokenMap = JSON.parse(localStorage.getItem("token")).fieldtypes;
    return tokenMap[typeId];
  };

  // Generate the dynamic form based on the parsedCfoData and token
  const renderDynamicForm = () => {
    if (!parsedCfoData) return null;

    return parsedCfoData.map((formData, index) => {
      const inputType = formData.map((item) => {
        return item?.type_id;
      });

      const inputType2 = inputType.map((item) => {
        return getInputType(item);
      });

      const inputType3 = inputType2.map((itemData) => {
        switch (itemData) {
          case "text_input":
            return (
              <Input
                key={index}
                type="easy"
                label={formData[0].name}
                classNameInput={
                  !validate.campaignName
                    ? "text-black  w-full border rounded-[5px] ltr text-end"
                    : "text-black  w-full border !border-red-500 rounded-[5px] ltr text-end"
                }
                classNameCard="!w-full"
                className={`w-full text-black`}
                typeInput="text"
                placeholder="توضیحات را وارد کنید"
                value={campaignNameValues[index]}
                onChange={(e) => {
                  // Add a unique identifier (e.g., field name or index) to the log statement
                  console.log(`Field Index (${formData[0].name}):`, index);
                  console.log(
                    `New Value (${formData[0].name}):`,
                    e.target.value
                  );
                  handleCampaignNameChange(e, index);
                }}
                required={formData.map((item) => item.requirement)}
              />
            );

          case "radio custom":
            const labelArray = formData.map((item) => item.name);
            return (
              <Input
                type={"checkbox"}
                key={index}
                label={labelArray}
                className={`col-span-6`}
                checked
                // options={/* Provide the options based on the parsed data */}
                // value={/* Get the value from the Redux store based on the input */}
                // onChange={/* Provide the relevant change handler */}
              />
            );

          case "text area":
            return (
              <>
                <Input
                  required={validate.textArea}
                  type="textarea"
                  label={formData.map((item) => item.name)}
                  classNameInput={
                    !validate.textArea
                      ? "text-black  w-full border rounded-[5px] ltr text-end"
                      : "text-black  w-full border !border-red-500 rounded-[5px] ltr text-end"
                  }
                  className={"w-full text-black"}
                  typeInput="text"
                  placeholder="توضیحات را وارد کنید"
                  value={textareaValue}
                  onChange={(e) => {
                    handleTextareaChange(e, formData);
                  }}
                />
              </>
            );

          case "image_input":
            return (
              <>
                <p>{formData.map((item) => item.name)}</p>
                <Input
                  key={formData.id}
                  type="file"
                  label={formData.map((item) => item.name)}
                  classNameInput="text-black  w-full border rounded-[2px] ltr text-end"
                  className={"w-full text-black"}
                  typeInput="file"
                  placeholder="توضیحات را وارد کنید"
                  // value={fileValue}
                  onChange={(e) => handleFileChange(e, formData[0])}
                  required={formData.map((item) => item.requirement)}
                />
              </>
            );

          case "date":
            return (
              <>
                <div style={{ direction: "rtl" }} className="!w-full">
                  <label>{formData.map((item) => item.name)}</label>
                  <DatePicker
                    required={formData.map((item) => item.requirement)}
                    placeholder="تاریخ انتخاب کنید"
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      padding: "18px 5px",
                      borderRadius: "2px",
                      borderColor: "#D9D9D9",
                    }}
                    containerStyle={{
                      width: "100%",
                    }}
                    animations={[
                      transition({
                        from: 35,
                        transition:
                          "all 600ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
                      }),
                      opacity({ from: 0.1, to: 0.8, duration: 300 }),
                    ]}
                    locale={persian_fa}
                    calendar={persian}
                    range
                    dateSeparator=" تا "
                    format="YYYY/MM/DD"
                    onChange={handleCampaignStartTimeChange}
                  />
                </div>
              </>
            );
          default:
            return null;
        }
      });

      return inputType3;
    });
  };

  const [bannerImages, setBannerImages] = useState({});
  const [selectedItems, setSelectedItems] = useState([]); // Create an array to store selected items
  const [imageValues, setImageValues] = useState({});

  const handleBannerImageChange = (e, itemId) => {
    const file = e.target.files[0];
    if (file) {
      const updatedSelectedItems = [...selectedItems, file];
      setSelectedItems(updatedSelectedItems);

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target.result;
        setBannerImages((prevImages) => ({
          ...prevImages,
          [itemId]: imageData,
        }));

        // Update the imageValues state with the image and its associated input value
        setImageValues((prevValues) => ({
          ...prevValues,
          [itemId]: {
            image: file,
            cpc: prevValues[itemId] ? prevValues[itemId].cpc : "", // Preserve existing cpc value if it exists
          },
        }));
    selectedBanner(imageValues)

      };
      reader.readAsDataURL(file);
    }
  };

  const handleCPCChange = (e, itemId) => {
    const cpcValue = e.target.value;
    setImageValues((prevValues) => ({
      ...prevValues,
      [itemId]: {
        ...prevValues[itemId],
        cpc: cpcValue,
      },
    }));
    selectedBanner(imageValues)
    console.log("value cpc", imageValues);
  };

  return (
    <div className="w-full p-10 bg-white rounded-[4px] relative">
      {/* Render the dynamic form */}
      <div className="flex flex-row gap-4">
        <div className="flex flex-col w-full gap-4">{renderDynamicForm()}</div>
        <div className="w-full">
          {Campaign_type == "3" && (
            <div className="flex flex-wrap items-center justify-center gap-4 pt-10">
              {banner &&
                Object?.entries(banner)?.map(([itemId, item]) => (
                  <div
                    key={itemId}
                    className={
                      "w-[200px] h-[300px] flex flex-col items-center justify-center gap-4 border px-4 rounded-[10px] cursor-pointer"
                    }
                  >
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      id={`banner-input-${itemId}`}
                      onChange={(e) => handleBannerImageChange(e, itemId)}
                    />
                    <label htmlFor={`banner-input-${itemId}`}>
                      <img
                        className="object-contain !w-[190px] !h-[290px] cursor-pointer"
                        src={
                          bannerImages[itemId]
                            ? bannerImages[itemId]
                            : `https://placehold.co/${item}`
                        }
                        alt={`Banner Item ${itemId}`}
                      />
                    </label>
                    <div className="w-full border rounded-[4px] ">
                      <input
                        type="text"
                        className="w-full"
                        value={
                          imageValues[itemId] ? imageValues[itemId].cpc : ""
                        }
                        onChange={(e) => handleCPCChange(e, itemId)}
                        placeholder="CPC Value"
                      />
                    </div>
                  </div>
                ))}
            </div>
          )}

          {Campaign_type == "2" && (
            <InstagramPostTemplate
              previewImage={previewImage}
              textArea={textareaValue.value} // Use Formik values
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentForm;
