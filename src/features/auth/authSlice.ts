import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { client } from '../../api/client';
import { createAppAsyncThunk } from '../../app/withTypes'

interface AuthState {
  username: string | null;
}

export const login = createAppAsyncThunk(
  'auth/login',
  async (username: string) => {
    await client.post('/fakeApi/login', { username })
    return username
  }
)

export const logout = createAppAsyncThunk('auth/logout', async () => {
  await client.post('/fakeApi/logout', {})
})

const initialState: AuthState = {
  username: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // reducers: {
  //   userLoggedIn(state, action: PayloadAction<string>) {
  //     state.username = action.payload;
  //   },
  //   userLoggedOut(state) {
  //     state.username = null;
  //   },
  // },
  reducers: {},
  extraReducers: builder => {
    // and handle the thunk actions instead
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.username = action.payload
      })
      .addCase(logout.fulfilled, state => {
        state.username = null
      })
  }
});

export default authSlice.reducer;
// export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export const selectCurrentUsername = (state: RootState) => state.auth.username;
