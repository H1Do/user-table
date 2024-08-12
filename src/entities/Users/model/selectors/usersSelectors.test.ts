import { StateSchema } from 'app/providers/StoreProvider';
import { sortByValues, sortDirectionValues } from '../types/users';
import {
    selectSearchQuery,
    selectSortBy,
    selectSortDirection,
    selectUsers,
    selectUsersError,
    selectUsersIsLoading,
} from './usersSelectors';

describe('usersSelectors', () => {
    describe('selectUsers', () => {
        test('selectUsers returns users', () => {
            const state: DeepPartial<StateSchema> = { users: { users: [{ id: 1 }, { id: 2 }] } };
            expect(selectUsers(state as StateSchema)).toEqual([{ id: 1 }, { id: 2 }]);
        });

        test('selectUsers works with empty state', () => {
            const state: DeepPartial<StateSchema> = {};
            expect(selectUsers(state as StateSchema)).toEqual([]);
        });
    });

    describe('selectUsersError', () => {
        test('selectUsersError returns error', () => {
            const state: DeepPartial<StateSchema> = { users: { error: 'error' } };
            expect(selectUsersError(state as StateSchema)).toBe('error');
        });

        test('selectUsersError works with empty state', () => {
            const state: DeepPartial<StateSchema> = {};
            expect(selectUsersError(state as StateSchema)).toBeUndefined();
        });
    });

    describe('selectUsersIsLoading', () => {
        test('selectUsersIsLoading returns isLoading', () => {
            const state: DeepPartial<StateSchema> = { users: { isLoading: true } };
            expect(selectUsersIsLoading(state as StateSchema)).toBe(true);
        });

        test('selectUsersIsLoading works with empty state', () => {
            const state: DeepPartial<StateSchema> = {};
            expect(selectUsersIsLoading(state as StateSchema)).toBe(false);
        });
    });

    describe('selectSortBy', () => {
        test('selectSortBy returns sortBy', () => {
            const state: DeepPartial<StateSchema> = { users: { sortBy: sortByValues.AGE } };
            expect(selectSortBy(state as StateSchema)).toBe(sortByValues.AGE);
        });

        test('selectSortBy works with empty state', () => {
            const state: DeepPartial<StateSchema> = {};
            expect(selectSortBy(state as StateSchema)).toBeUndefined();
        });
    });

    describe('selectSearchQuery', () => {
        test('selectSearchQuery returns searchQuery', () => {
            const state: DeepPartial<StateSchema> = { users: { searchQuery: 'test' } };
            expect(selectSearchQuery(state as StateSchema)).toBe('test');
        });

        test('selectSearchQuery works with empty state', () => {
            const state: DeepPartial<StateSchema> = {};
            expect(selectSearchQuery(state as StateSchema)).toBeUndefined();
        });
    });

    describe('selectSortDirection', () => {
        test('selectSortDirection returns sortDirection', () => {
            const state: DeepPartial<StateSchema> = { users: { sortDirection: sortDirectionValues.ASC } };
            expect(selectSortDirection(state as StateSchema)).toBe(sortDirectionValues.ASC);
        });

        test('selectSortDirection works with empty state', () => {
            const state: DeepPartial<StateSchema> = {};
            expect(selectSortDirection(state as StateSchema)).toBeUndefined();
        });
    });
});
