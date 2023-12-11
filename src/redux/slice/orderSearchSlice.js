import { createSlice } from "@reduxjs/toolkit";

const orderSearchSlice = createSlice({
  initialState: { searchState: {}, searchQuery: {} },
  name: "orderSearch",
  reducers: {
    setSearchState: (state, action) => {
      return { ...state, searchState: action.payload };
    },
    setOrderId: (state, action) => {
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
    setOrderTypes: (state, action) => {
      return { ...state, searchState: { ...state.searchState, orderType: action.payload } };
    },
    setPaymentTypes: (state, action) => {
      return { ...state, searchState: { ...state.searchState, paymentType: action.payload } };
    },
    setPaymentGateways: (state, action) => {
      return { ...state, searchState: { ...state.searchState, paymentGateway: action.payload } };
    },
    setDateRange: (state, action) => {
      return { ...state, searchState: { ...state.searchState, createdAt: action.payload } };
    },
    createSearchQuery: (state) => {
      const query = Object.entries(state.searchState).reduce((acc, [key, value]) => {
        if (Array.isArray(value) && !!value.length) {
          return { ...acc, [key]: { $in: value } };
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

export const selectOrderSearchState = (state) => state.orderSearch.searchState;
export const selectOrderSearchQuery = (state) => state.orderSearch.searchQuery;

export const { setSearchState, setOrderId, setClientName, setClientEmail, setAccountManagers, setBrands, setOrderTypes, setPaymentTypes, setPaymentGateways, setDateRange, createSearchQuery, resetSearch } = orderSearchSlice.actions;

export default orderSearchSlice.reducer;
