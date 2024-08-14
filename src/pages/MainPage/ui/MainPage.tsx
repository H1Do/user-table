import { fetchUsers, usersActions, UsersTable } from 'entities/Users';
import {
    getUsers,
    getUsersError,
    getUsersIsLoading,
    getUsersSearchQuery,
} from 'entities/Users/model/selectors/usersSelectors';
import { SearchInput } from 'features/SearchInput/ui/SearchInput';
import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Page } from 'shared/ui/Page/Page';

interface MainPageProps {
    className?: string;
}

export const MainPage = memo(function MainPage({ className }: MainPageProps) {
    const dispatch = useAppDispatch();
    const users = useSelector(getUsers);
    const isLoading = useSelector(getUsersIsLoading);
    const error = useSelector(getUsersError);
    const searchQuery = useSelector(getUsersSearchQuery);
    const { setSearchQuery } = usersActions;

    useEffect(() => {
        dispatch(fetchUsers(''));
    }, [dispatch]);

    const onSearchCallback = () => {
        dispatch(fetchUsers(searchQuery || ''));
    };

    const onChangeQuery = (query: string) => {
        dispatch(setSearchQuery(query));
    };

    const onClearQuery = () => {
        dispatch(setSearchQuery(''));
        dispatch(fetchUsers(''));
    };

    return (
        <Page className={classNames('', {}, [className])} alignCenter>
            <SearchInput
                onSearchCallback={onSearchCallback}
                setSearchQuery={onChangeQuery}
                searchQuery={searchQuery}
                clearQuery={onClearQuery}
            />
            <UsersTable users={users} isLoading={isLoading} error={error} />
        </Page>
    );
});
