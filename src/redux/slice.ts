import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface UserState {
  id: string,
  data: {},
  season: {},
  apiKey: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2ZTk4YzM0MC0wMTY4LTAxM2QtZThiOC0wZWZjZTE3NWQ4MjUiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNzE3MTUyMTYyLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Ii1jMjUyMmQ3NS1jMmEwLTQzMjAtYjJlYS0zZGRmMTdiYjkyNzcifQ.yTwYQYHp4OnSPJn-DC_OC0w_M3kKZJi6l2qGFqCHY3I";
}

const initialState: UserState = {
  id: '',
  data: {},
  season: {},
  apiKey: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2ZTk4YzM0MC0wMTY4LTAxM2QtZThiOC0wZWZjZTE3NWQ4MjUiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNzE3MTUyMTYyLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6Ii1jMjUyMmQ3NS1jMmEwLTQzMjAtYjJlYS0zZGRmMTdiYjkyNzcifQ.yTwYQYHp4OnSPJn-DC_OC0w_M3kKZJi6l2qGFqCHY3I",
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    setSeason: (state, action: PayloadAction<any>) => {
      state.season = action.payload;
    },
  },
});

export const { setId, setData, setSeason } = userSlice.actions;
export default userSlice.reducer;
