import { createSlice } from "@reduxjs/toolkit";

const clientSearchSlice = createSlice({
  initialState: { searchState: {}, searchQuery: {} },
  name: "clientSearch",
  reducers: {
    setSearchState: (state, action) => {
      return { ...state, searchState: action.payload };
    },
    setClientId: (state, action) => {
      return { ...state, searchState: { ...state.searchState, _id: action.payload } };
    },
    setClientName: (state, action) => {
      return { ...state, searchState: { ...state.searchState, title: action.payload.toLowerCase() } };
    },
    setClientEmail: (state, action) => {
      return { ...state, searchState: { ...state.searchState, email: action.payload.toLowerCase() } };
    },
    setBrands: (state, action) => {
      return { ...state, searchState: { ...state.searchState, brand: action.payload } };
    },
    setAccountManagers: (state, action) => {
      return { ...state, searchState: { ...state.searchState, user: action.payload } };
    },
    setCategories: (state, action) => {
      return { ...state, searchState: { ...state.searchState, category: action.payload } };
    },
    setClientStatus: (state, action) => {
      return { ...state, searchState: { ...state.searchState, status: action.payload } };
    },
    setClientHealth: (state, action) => {
      return { ...state, searchState: { ...state.searchState, health: action.payload } };
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

export const selectClientSearchState = (state) => state.clientSearch.searchState;
export const selectClientSearchQuery = (state) => state.clientSearch.searchQuery;

export const { setSearchState, setClientId, setClientName, setClientEmail, setAccountManagers, setBrands, setCategories, setClientHealth, setClientStatus, setDateRange, createSearchQuery, resetSearch } = clientSearchSlice.actions;

export default clientSearchSlice.reducer;
