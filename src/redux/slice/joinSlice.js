import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // 사용자 정보와 관련된 상태 삭제 (API)
  // users: { id: '', password: '' },
};

const joinSlice = createSlice({
  name: 'join',
  initialState,
  reducers: {
    // 사용자 정보와 관련된 액션 및 리듀서 삭제 (API)
    // register:
    // (state, action) => {
    //   return { ...state, users: action.payload };
    // },
  },
});
export const { register } = joinSlice.actions;
export default joinSlice.reducer;
