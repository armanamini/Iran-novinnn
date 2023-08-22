import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  textareaValue: '',
  linkValue: '',
  fileValue: '',
  ProductUsageValue: '',
  mentionValue: '',
  hashtagValue: '',
  shouldValue: '',
  shouldNotValue: '',
  suggestionValue: '',
  campaignNameValue: '',
  campaignStartTimeValue: '',
  campaignEndTimeValue: '',
  publicationNotesValue: '',
  totalPriceOfItemsValue: '',
};

const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    updateTextareaValue: (state, action) => {
      state.textareaValue = action.payload;
    },
    updatetotalPriceOfItemsValue:(state, action)=>{
      state.totalPriceOfItemsValue = action.payload;
    },
    updateLinkValue: (state, action) => {
      state.linkValue = action.payload;
    },
    updateFileValue: (state, action) => {
      state.fileValue = action.payload;
    },
    updateProductUsageValue: (state, action) => {
      state.ProductUsageValue = action.payload;
    },
    updateMentionValue: (state, action) => {
      state.mentionValue = action.payload;
    },
    updateHashtagValue: (state, action) => {
      state.hashtagValue = action.payload;
    },
    updateShouldValue: (state, action) => {
      state.shouldValue = action.payload;
    },
    updateShouldNotValue: (state, action) => {
      state.shouldNotValue = action.payload;
    },
    updateSuggestionValue: (state, action) => {
      state.suggestionValue = action.payload;
    },
    updateCampaignNameValue: (state, action) => {
      state.campaignNameValue = action.payload;
    },
    updateCampaignStartTimeValue: (state, action) => {
      state.campaignStartTimeValue = action.payload;
    },
    updateCampaignEndTimeValue: (state, action) => {
      state.campaignEndTimeValue = action.payload;
    },
    updatePublicationNotesValue: (state, action) => {
      state.publicationNotesValue = action.payload;
    },
  },
});

export const {
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
  updatetotalPriceOfItemsValue
} = inputSlice.actions;

export default inputSlice.reducer;