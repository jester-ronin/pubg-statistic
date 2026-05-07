import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  playerName: string;
}

const initialState: UserState = {
  playerName: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPlayerName: (state, action: PayloadAction<string>) => {
      state.playerName = action.payload;
    },
  },
});

export const { setPlayerName } = userSlice.actions;
export default userSlice.reducer;
