import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { usersReducer } from 'entities/Users';
import { $api } from 'shared/api/api';
import { StateSchema, ThunkExtraArgument } from './StateSchema';

export function createReduxStore(initialState?: StateSchema) {
    const rootReducer: ReducersMapObject = {
        users: usersReducer,
    };

    const extraArgument: ThunkExtraArgument = {
        api: $api,
    };

    const store = configureStore({
        reducer: rootReducer,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument,
                },
            }).concat([]),
    });

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
