import React, { useEffect, useRef, useState } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Input from "../../core/component/Input/Input";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
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
import DatePicker from "react-multi-date-picker";
import "moment/locale/fa";
import axios from "axios";

const ContentForm = (props) => {
  const [data, setData] = useState();
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_MAIN_URL}campaign-type/custom-form?id=${router.query.id}&type_id=11`
        )
        .then((response) => {
          setData(JSON.parse(response.data[0]?.options));
          console.log(
            "why me ",
            JSON.parse(JSON.parse(response.data[0]?.options)[0]?.cfo_data)
          );
        });
    }
  }, [router.query]);

  const datePickerRef = useRef();
  const datePickerRefEnd = useRef();
  const textareaValue = useSelector((state) => state.input.textareaValue);
  const linkValue = useSelector((state) => state.input.linkValue);
  const fileValue = useSelector((state) => state.input.fileValue);
  const ProductUsageValue = useSelector(
    (state) => state.input.ProductUsageValue
  );
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

  const dispatch = useDispatch();

  const handleTextareaChange = (e) => {
    dispatch(updateTextareaValue(e.target.value));
  };

  const handleLinkChange = (e) => {
    dispatch(updateLinkValue(e.target.value));
  };

  const handleFileChange = (e) => {
    dispatch(updateFileValue(e.target.value));
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

  const handleCampaignNameChange = (e) => {
    dispatch(updateCampaignNameValue(e.target.value));
  };

  const handleCampaignStartTimeChange = (e) => {
    dispatch(
      updateCampaignStartTimeValue(datePickerRef.current.childNodes[0].value)
    );
    console.log(datePickerRef.current.childNodes[0].value);
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
  const parsedCfoData = data?.map((item) => JSON.parse(item?.cfo_data));
  console.log("this is data", parsedCfoData);
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
        console.log("itemData", itemData);

        switch (itemData) {
          case "text_input":
            return (
              <Input
                key={index}
                type="easy"
                label={formData[0].name}
                classNameInput={`text-black w-full ltr text-end col-span-6`}
                classNameCard="!w-full"
                className={`w-full text-black col-span-6`}
                typeInput="text"
                placeholder="توضیحات را وارد کنید"
                // value={/* Get the value from the Redux store based on the input */}
                // onChange={/* Provide the relevant change handler */}
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
            console.log(formData.filter((item) => item.type_id == itemData));
            return (
              <>
                <Input
                  type="textarea"
                  label={formData.map((item) => item.name)}
                  classNameInput="text-black  w-full border col-span-12 rounded-[2px] ltr text-end"
                  className={"w-full col-span-12 text-black"}
                  typeInput="text"
                  placeholder="توضیحات را وارد کنید"
                  value={textareaValue}
                  onChange={handleTextareaChange}
                />
              </>
            );

          default:
            return null;
        }
      });

      return inputType3;
    });
  };

  return (
    <div
      className="w-full p-10 bg-white rounded-[4px]"
      style={{
        boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      {/* Render the dynamic form */}
      <div className="grid grid-cols-12 gap-4">{renderDynamicForm()}</div>

      {/* ... (existing code) */}
    </div>
  );
};

export default ContentForm;
