import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  textareaValue: '',
  typeId:'',
  parentId:'',
  linkValue: '',
  fileValue: '',
  currentID:'',
  startDate:'',
  endDate:'',
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
      const { typeId, value,parentId ,currentID} = action.payload;
      state.textareaValue = value;
      state.typeId = typeId;
      state.parentId = parentId;
      state.currentID = currentID;
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
      const {startDate,endDate} = action.payload;
      state.startDate = startDate
      state.endDate = endDate
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