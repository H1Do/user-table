import { StateSchema } from 'app/providers/StoreProvider';
import { sortByValues } from '../types/users';
import {
    getSearchQuery,
    getSortBy,
    getSortDirection,
    getUsers,
    getUsersError,
    getUsersIsLoading,
} from './usersSelectors';
import { sortDirectionValues } from 'shared/config/types/sort';

describe('usersSelectors', () => {
    describe('getUsers', () => {
        test('getUsers returns users', () => {
            const state: DeepPartial<StateSchema> = { users: { users: [{ id: 1 }, { id: 2 }] } };
            expect(getUsers(state as StateSchema)).toEqual([{ id: 1 }, { id: 2 }]);
        });

        test('getUsers works with empty state', () => {
            const state: DeepPartial<StateSchema> = {};
            expect(getUsers(state as StateSchema)).toEqual([]);
        });
    });

    describe('getUsersError', () => {
        test('getUsersError returns error', () => {
            const state: DeepPartial<StateSchema> = { users: { error: 'error' } };
            expect(getUsersError(state as StateSchema)).toBe('error');
        });

        test('getUsersError works with empty state', () => {
            const state: DeepPartial<StateSchema> = {};
            expect(getUsersError(state as StateSchema)).toBeUndefined();
        });
    });

    describe('getUsersIsLoading', () => {
        test('getUsersIsLoading returns isLoading', () => {
            const state: DeepPartial<StateSchema> = { users: { isLoading: true } };
            expect(getUsersIsLoading(state as StateSchema)).toBe(true);
        });

        test('getUsersIsLoading works with empty state', () => {
            const state: DeepPartial<StateSchema> = {};
            expect(getUsersIsLoading(state as StateSchema)).toBe(false);
        });
    });

    describe('getSortBy', () => {
        test('getSortBy returns sortBy', () => {
            const state: DeepPartial<StateSchema> = { users: { sortBy: sortByValues.AGE } };
            expect(getSortBy(state as StateSchema)).toBe(sortByValues.AGE);
        });

        test('getSortBy works with empty state', () => {
            const state: DeepPartial<StateSchema> = {};
            expect(getSortBy(state as StateSchema)).toBeUndefined();
        });
    });

    describe('getSearchQuery', () => {
        test('getSearchQuery returns searchQuery', () => {
            const state: DeepPartial<StateSchema> = { users: { searchQuery: 'test' } };
            expect(getSearchQuery(state as StateSchema)).toBe('test');
        });

        test('getSearchQuery works with empty state', () => {
            const state: DeepPartial<StateSchema> = {};
            expect(getSearchQuery(state as StateSchema)).toBeUndefined();
        });
    });

    describe('getSortDirection', () => {
        test('getSortDirection returns sortDirection', () => {
            const state: DeepPartial<StateSchema> = { users: { sortDirection: sortDirectionValues.ASC } };
            expect(getSortDirection(state as StateSchema)).toBe(sortDirectionValues.ASC);
        });

        test('getSortDirection works with empty state', () => {
            const state: DeepPartial<StateSchema> = {};
            expect(getSortDirection(state as StateSchema)).toBeUndefined();
        });
    });
});
