import { StateSchema } from 'app/providers/StoreProvider';

export const getUsers = (state: StateSchema) => state.users?.users || [];
export const getUsersIsLoading = (state: StateSchema) => state.users?.isLoading || false;
export const getUsersError = (state: StateSchema) => state.users?.error;
export const getSearchQuery = (state: StateSchema) => state.users?.searchQuery;
export const getSortBy = (state: StateSchema) => state.users?.sortBy;
export const getSortDirection = (state: StateSchema) => state.users?.sortDirection;
