import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trademarkUK: false,
  ukSharedOffice: false,
  registeredAgent: false,
  logoRequest: false,
  usLLCFormation: false,
  usTaxFiling: false,
};

const submissionsSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    markTrademarkUKSubmitted(state) {
      state.trademarkUK = true;
    },
    markUKSharedOfficeSubmitted(state) {
      state.ukSharedOffice = true;
    },
    markRegisteredAgentSubmitted(state) {
      state.registeredAgent = true;
    },
    markLogoRequestSubmitted(state) {
      state.logoRequest = true;
    },
    markUSLLCFormationSubmitted(state) {
      state.usLLCFormation = true;
    },
    markUSTaxFilingSubmitted(state) {
      state.usTaxFiling = true;
    },
    resetSubmissions() {
      return { ...initialState };
    },
  },
});

export const {
  markTrademarkUKSubmitted,
  markUKSharedOfficeSubmitted,
  markRegisteredAgentSubmitted,
  markLogoRequestSubmitted,
  markUSLLCFormationSubmitted,
  markUSTaxFilingSubmitted,
  resetSubmissions,
} = submissionsSlice.actions;

export const selectSubmissions = (state) => state.submissions;
export const selectAllSubmitted = (state) => {
  const s = state.submissions;
  return s.trademarkUK && s.ukSharedOffice && s.registeredAgent && s.logoRequest && s.usLLCFormation && s.usTaxFiling;
};

export default submissionsSlice.reducer;