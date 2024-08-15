import { fetchUsers, UsersSearchInput, UsersTable } from 'entities/Users';
import { getUsers, getUsersError, getUsersIsLoading } from 'entities/Users/model/selectors/usersSelectors';
import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Page } from 'shared/ui/Page/Page';
import { Header } from 'widgets/Header/ui/Header';

interface MainPageProps {
    className?: string;
}

export const MainPage = memo(function MainPage({ className }: MainPageProps) {
    const dispatch = useAppDispatch();
    const users = useSelector(getUsers);
    const isLoading = useSelector(getUsersIsLoading);
    const error = useSelector(getUsersError);

    useEffect(() => {
        dispatch(fetchUsers(''));
    }, [dispatch]);

    return (
        <Page className={classNames('', {}, [className])} alignCenter>
            <Header />
            <UsersSearchInput />
            <UsersTable users={users} isLoading={isLoading} error={error} />
        </Page>
    );
});
