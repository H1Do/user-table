import { StateSchema } from 'app/providers/StoreProvider';

export const selectUsers = (state: StateSchema) => state.users?.users || [];
export const selectUsersIsLoading = (state: StateSchema) => state.users?.isLoading || false;
export const selectUsersError = (state: StateSchema) => state.users?.error;
export const selectSearchQuery = (state: StateSchema) => state.users?.searchQuery;
export const selectSortBy = (state: StateSchema) => state.users?.sortBy;
export const selectSortDirection = (state: StateSchema) => state.users?.sortDirection;
