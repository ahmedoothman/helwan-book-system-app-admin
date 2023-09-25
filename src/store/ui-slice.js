import { createSlice } from '@reduxjs/toolkit';
// cookies
import Cookies from 'js-cookie';
const initialState = {
  api_url: 'http://127.0.0.1:9000',
  copyrights:
    'جميع الحقوق محفوظه لمركز الاتصالات وتكنولوجيا المعلومات - جامعة حلوان © 2023',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setStudentData(state, action) {
      state.studentData = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
