import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { User } from '../types/users';

export const fetchUsers = createAsyncThunk<User[], string, ThunkConfig<string>>(
    'users/fetchUsers',
    async (query, thunkAPI) => {
        try {
            const data = await thunkAPI.extra.api.get<User[]>(`/users/search?q=${query}`);

            if (!data) {
                throw new Error('Response data is empty');
            }

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(String(error));
        }
    },
);
