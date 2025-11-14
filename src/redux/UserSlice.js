import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  name: '',
  userName: '',
  email: '',
  password: '',
  dob: '',
  number: '',
  profilePic: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const {name, userName, email, password, dob, number, profilePic} =
        action.payload;
      state.name = name;
      state.userName = userName;
      state.email = email;
      state.password = password;
      state.dob = dob;
      state.number = number;
      state.profilePic = profilePic;
    },
  },
});

export const {setUserData} = userSlice.actions;
export default userSlice.reducer;
