import { StateSchema } from 'app/providers/StoreProvider';

export const getUsers = (state: StateSchema) => state.users?.users || [];
export const getUsersIsLoading = (state: StateSchema) => state.users?.isLoading || false;
export const getUsersError = (state: StateSchema) => state.users?.error;
export const getUsersSearchQuery = (state: StateSchema) => state.users?.searchQuery;
export const getUsersSortBy = (state: StateSchema) => state.users?.sortBy;
export const getUsersSortDirection = (state: StateSchema) => state.users?.sortDirection;
