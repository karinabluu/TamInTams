import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // 사용자 정보와 관련된 상태 삭제 (API)
  // userId: '',
  // userPw: '',
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    // 사용자 정보와 관련된 액션 및 리듀서 삭제
    // trylogin: (state, action) => {
    //   return;
    // },
  },
});
export const { trylogin } = loginSlice.actions;
export default loginSlice.reducer;
