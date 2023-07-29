import React from "react";
import { Provider, useSelector, useDispatch } from "react-redux";

import Input from "../../core/component/Input/Input";
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

const ContentForm = (props) => {
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
    dispatch(updateCampaignStartTimeValue(e.target.value));
  };

  const handleCampaignEndTimeChange = (e) => {
    dispatch(updateCampaignEndTimeValue(e.target.value));
  };

  const handlePublicationNotesChange = (e) => {
    dispatch(updatePublicationNotesValue(e.target.value));
  };

  return (
    <div className="w-full p-10 bg-white rounded-[4px]" style={{
      boxShadow: "0px 4px 12px 0px rgba(0, 0, 0, 0.25)"
    }}>
      <div className="w-full">
        <Input
          type="textarea"
          label="سناریو و متن محتوا"
          classNameInput="text-black border rounded-[2px] ltr text-end"
          className="p-10 text-black"
          typeInput="text"
          placeholder="توضیحات را وارد کنید"
          value={textareaValue}
          onChange={handleTextareaChange}
        />
      </div>

      <div className="flex !w-full flex-row gap-4 px-1 my-4 pb-4">
        <Input
          type="easy"
          label="لینک سایت شما"
          classNameInput="text-black w-full ltr text-end"
          classNameCard="!w-full"
          className="w-full text-black"
          typeInput="text"
          placeholder="توضیحات را وارد کنید"
          value={linkValue}
          onChange={handleLinkChange}
        />

        <Input
          type="file"
          label="لینک سایت شما"
          classNameInput="text-black w-full ltr text-end"
          classNameCard="!w-full"
          className="justify-end w-full text-black"
          typeInput="file"
          placeholder="توضیحات را وارد کنید"
          value={fileValue}
          onChange={handleFileChange}
        />
      </div>

      <div className="w-full">
        <Input
          type="textarea"
          label=" توضیحات فایل پیشنهادی "
          classNameInput="text-black border rounded-[2px] ltr text-end"
          className="p-10 text-black"
          typeInput="text"
          placeholder="توضیحات را وارد کنید"
          value={ProductUsageValue}
          onChange={handleProductUsageChange}
        />
      </div>

      <div className="flex !w-full flex-row gap-4 px-1 my-4 pb-4 ">
        <Input
          type="easy"
          label="منشن"
          classNameInput="text-black w-full ltr text-end"
          classNameCard="!w-full"
          className="w-full text-black"
          typeInput="text"
          placeholder="توضیحات را وارد کنید"
          value={mentionValue}
          onChange={handleMentionChange}
        />
        <Input
          type="easy"
          label="هشتگ"
          classNameInput="text-black w-full ltr text-end"
          classNameCard="!w-full"
          className="w-full text-black"
          typeInput="text"
          placeholder="توضیحات را وارد کنید"
          value={hashtagValue}
          onChange={handleHashtagChange}
        />
      </div>

      <div className="flex !w-full flex-row gap-4 px-1 my-4 pb-4 ">
        <Input
          type="easy"
          label="باید ها"
          classNameInput="text-black w-full ltr text-end"
          classNameCard="!w-full"
          className="w-full text-black"
          typeInput="text"
          placeholder="توضیحات را وارد کنید"
          value={shouldValue}
          onChange={handleShouldChange}
        />
        <Input
          type="easy"
          label="نباید ها"
          classNameInput="text-black w-full ltr text-end"
          classNameCard="!w-full"
          className="w-full text-black"
          typeInput="text"
          placeholder="توضیحات را وارد کنید"
          value={shouldNotValue}
          onChange={handleShouldNotChange}
        />
      </div>

      <div className="w-full">
        <Input
          type="textarea"
          label="پیشنهاد استفاده از محصولات"
          classNameInput="text-black border rounded-[2px] ltr text-end"
          className="p-10 text-black"
          typeInput="text"
          placeholder="توضیحات را وارد کنید"
          value={suggestionValue}
          onChange={handleSuggestionChange}
        />
      </div>

      <div className="w-full">
        <Input
          type="easy"
          label="نام کمپین"
          classNameInput="text-black w-full ltr text-end"
          classNameCard="!w-full"
          className="w-full text-black"
          typeInput="text"
          placeholder="توضیحات را وارد کنید"
          value={campaignNameValue}
          onChange={handleCampaignNameChange}
        />
      </div>

      <div className="flex !w-full flex-row gap-4 px-1 my-4 pb-4 ">
        <Input
          type="easy"
          label="زمان شروع کمپین"
          classNameInput="text-black w-full ltr text-end"
          classNameCard="!w-full"
          className="w-full text-black"
          typeInput="text"
          placeholder="توضیحات را وارد کنید"
          value={campaignStartTimeValue}
          onChange={handleCampaignStartTimeChange}
        />
        <Input
          type="easy"
          label="زمان پایان کمپین"
          classNameInput="text-black w-full ltr text-end"
          classNameCard="!w-full"
          className="w-full text-black"
          typeInput="text"
          placeholder="توضیحات را وارد کنید"
          value={campaignEndTimeValue}
          onChange={handleCampaignEndTimeChange}
        />
      </div>

      <div className="w-full">
        <Input
          type="easy"
          label="ملاحظات انتشار"
          classNameInput="text-black w-full ltr text-end"
          classNameCard="!w-full"
          className="w-full text-black"
          typeInput="text"
          placeholder="توضیحات را وارد کنید"
          value={publicationNotesValue}
          onChange={handlePublicationNotesChange}
        />
      </div>
    </div>
  );
};

export default ContentForm;
