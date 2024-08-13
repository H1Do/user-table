import { fetchUsers, UsersTable } from 'entities/Users';
import { getUsers, getUsersIsLoading } from 'entities/Users/model/selectors/usersSelectors';
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

    useEffect(() => {
        dispatch(fetchUsers(''));
    }, [dispatch]);

    const onSearchCallback = (value: string) => {
        dispatch(fetchUsers(value));
    };

    return (
        <Page className={classNames('', {}, [className])} alignCenter>
            <SearchInput onSearchCallback={onSearchCallback} />
            <UsersTable users={users} isLoading={isLoading} />
        </Page>
    );
});
