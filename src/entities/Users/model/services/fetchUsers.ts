import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { User } from '../types/users';

export const fetchUsers = createAsyncThunk<User[], string, ThunkConfig<string>>(
    'users/fetchUsers',
    async (query, thunkAPI) => {
        try {
            if (!query) {
                const data = await thunkAPI.extra.api.get<{ users: User[] }>(`/users`);

                if (!data) {
                    throw new Error('Response data is empty');
                }

                return data.users;
            }

            const uniqueUsers = new Set<User>();

            const requests = [
                thunkAPI.extra.api.get<{ users: User[] }>(`/users/filter?key=firstName&value=${query}`),
                thunkAPI.extra.api.get<{ users: User[] }>(`/users/filter?key=lastName&value=${query}`),
                thunkAPI.extra.api.get<{ users: User[] }>(`/users/filter?key=maidenName&value=${query}`),
                thunkAPI.extra.api.get<{ users: User[] }>(`/users/filter?key=age&value=${query}`),
                thunkAPI.extra.api.get<{ users: User[] }>(`/users/filter?key=gender&value=${query}`),
                thunkAPI.extra.api.get<{ users: User[] }>(`/users/filter?key=phone&value=${query}`),
                thunkAPI.extra.api.get<{ users: User[] }>(`/users/filter?key=address.city&value=${query}`),
                thunkAPI.extra.api.get<{ users: User[] }>(`/users/filter?key=address.address&value=${query}`),
            ];

            const responses = await Promise.all(requests);
            responses.forEach((response) => {
                response.users.forEach((user) => {
                    uniqueUsers.add(user);
                });
            });

            return Array.from(uniqueUsers);
        } catch (error) {
            return thunkAPI.rejectWithValue(String(error));
        }
    },
);
