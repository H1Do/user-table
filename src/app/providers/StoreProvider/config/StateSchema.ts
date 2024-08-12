import { UsersSchema } from 'entities/Users';
import { $apiType } from 'shared/api/api';

export interface StateSchema {
    users: UsersSchema;
}

export interface ThunkExtraArgument {
    api: $apiType;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArgument;
    state: StateSchema;
}
