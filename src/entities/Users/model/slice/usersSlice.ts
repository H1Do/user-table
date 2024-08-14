import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers } from '../services/fetchUsers';
import { sortByValues, UsersSchema } from '../types/users';
import { sortDirectionValues } from 'shared/config/types/sort';

const initialState: UsersSchema = {
    users: [],
    isLoading: false,
    error: undefined,
};

export const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setSortBy: (state, action: PayloadAction<sortByValues | undefined>) => {
            state.sortBy = action.payload;
        },
        setSortDirection: (state, action: PayloadAction<sortDirectionValues | undefined>) => {
            state.sortDirection = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: usersActions } = UsersSlice;
export const { reducer: usersReducer } = UsersSlice;
