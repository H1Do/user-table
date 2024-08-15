import { UsersSchema } from 'entities/Users';
import { ApiType } from 'shared/api/api';

export interface StateSchema {
    users: UsersSchema;
}

export interface ThunkExtraArgument {
    api: ApiType;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArgument;
    state: StateSchema;
}
