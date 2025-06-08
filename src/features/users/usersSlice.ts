import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { selectCurrentUsername } from '../auth/authSlice';
import { createAppAsyncThunk } from '../../app/withTypes';
import { client } from '../../api/client';

interface User {
  id: string;
  name: string;
}

// const initialState: User[] = [
//   { id: '0', name: 'Tianna Jenkins' },
//   { id: '1', name: 'Kevin Grant' },
//   { id: '2', name: 'Madison Price' },
// ];

export const fetchUsers = createAppAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get<User[]>('/fakeApi/users')
  return response.data
})

const initialState: User[] = []

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  }
});

export default usersSlice.reducer;

export const selectAllUsers = (state: RootState) => state.users;

export const selectUserById = (state: RootState, userId: string | null) =>
  state.users.find((user) => user.id === userId);

export const selectCurrentUser = (state: RootState) => {
  const currentUsername = selectCurrentUsername(state);
  return selectUserById(state, currentUsername);
};
