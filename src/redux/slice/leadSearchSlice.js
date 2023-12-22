import { createSlice } from "@reduxjs/toolkit";

const leadSearchSlice = createSlice({
  initialState: { searchState: {}, searchQuery: {} },
  name: "leadSearch",
  reducers: {
    setSearchState: (state, action) => {
      return { ...state, searchState: action.payload };
    },
    setLeadId: (state, action) => {
      return { ...state, searchState: { ...state.searchState, _id: action.payload } };
    },
    setName: (state, action) => {
      return { ...state, searchState: { ...state.searchState, title: action.payload.toLowerCase() } };
    },
    setEmail: (state, action) => {
      return { ...state, searchState: { ...state.searchState, email: action.payload.toLowerCase() } };
    },
    setBrands: (state, action) => {
      return { ...state, searchState: { ...state.searchState, brand: action.payload } };
    },
    setLeadStatus: (state, action) => {
      return { ...state, searchState: { ...state.searchState, leadStatus: action.payload } };
    },
    setLeadStages: (state, action) => {
      return { ...state, searchState: { ...state.searchState, leadStage: action.payload } };
    },
    setDateRange: (state, action) => {
      return { ...state, searchState: { ...state.searchState, createdAt: action.payload } };
    },
    createSearchQuery: (state) => {
      const query = Object.entries(state.searchState).reduce((acc, [key, value]) => {
        if (Array.isArray(value) && !!value.length) {
          return { ...acc, [key]: { $in: value } };
        }

        if (["title", "email"].includes(key) && !!value) {
          return { ...acc, [key]: { $regex: value } };
        }

        if (!Array.isArray(value) && !!value) {
          return { ...acc, [key]: value };
        }

        return acc;
      }, {});

      return { ...state, searchQuery: query };
    },
    resetSearch: (state) => {
      state.searchState = {};
      state.searchQuery = {};
    },
  },
});

export const selectLeadSearchState = (state) => state.leadSearch.searchState;
export const selectLeadSearchQuery = (state) => state.leadSearch.searchQuery;

export const { setSearchState, setLeadId, setName, setEmail, setBrands, setLeadStages, setLeadStatus, setDateRange, createSearchQuery, resetSearch } = leadSearchSlice.actions;

export default leadSearchSlice.reducer;
