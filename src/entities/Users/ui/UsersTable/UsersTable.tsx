import { getUsersSortBy, getUsersSortDirection } from 'entities/Users/model/selectors/usersSelectors';
import { usersActions } from 'entities/Users/model/slice/usersSlice';
import { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { sortDirectionValues } from 'shared/config/types/sort';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Loader } from 'shared/ui/Loader/Loader';
import { Table } from 'shared/ui/Table/Table';
import { sortByValues, User } from '../../model/types/users';
import { UsersTableItem } from '../UsersTableItem/UsersTableItem';
import cls from './UsersTable.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

interface UsersTableProps {
    className?: string;
    users: User[];
    isLoading?: boolean;
    error?: string;
}

export const UsersTable = memo(function UsersTableComponent({ className, users, isLoading, error }: UsersTableProps) {
    const dispatch = useAppDispatch();
    const sortBy = useSelector(getUsersSortBy);
    const sortDirection = useSelector(getUsersSortDirection);
    const { setSortBy, setSortDirection } = usersActions;

    const renderUsersTableItems = useCallback((user: User) => {
        return <UsersTableItem className={cls.item} user={user} key={user.id} />;
    }, []);

    const onSort = (newSortBy: sortByValues) => {
        if (newSortBy === sortBy) {
            if (sortDirection === sortDirectionValues.ASC) {
                dispatch(setSortDirection(sortDirectionValues.DESC));
            } else if (sortDirection === sortDirectionValues.DESC) {
                dispatch(setSortDirection(undefined));
            } else {
                dispatch(setSortDirection(sortDirectionValues.ASC));
            }
            return;
        }
        dispatch(setSortBy(newSortBy));
        dispatch(setSortDirection(sortDirectionValues.ASC));
    };

    const sortedUsers = useMemo(
        () =>
            users.slice().sort((firstUser, secondUser) => {
                if (!sortDirection) {
                    return 0;
                }

                if (sortBy === sortByValues.FULL_NAME) {
                    const firstUserFullName = `${firstUser.firstName}${firstUser.lastName}${firstUser.maidenName}`;
                    const secondUserFullName = `${secondUser.firstName}${secondUser.lastName}${secondUser.maidenName}`;

                    if (sortDirection === sortDirectionValues.ASC) {
                        return firstUserFullName.localeCompare(secondUserFullName);
                    } else {
                        return secondUserFullName.localeCompare(firstUserFullName);
                    }
                } else if (sortBy === sortByValues.AGE) {
                    if (sortDirection === sortDirectionValues.ASC) {
                        return firstUser.age - secondUser.age;
                    } else {
                        return secondUser.age - firstUser.age;
                    }
                } else if (sortBy === sortByValues.GENDER) {
                    if (sortDirection === sortDirectionValues.ASC) {
                        return firstUser.gender.localeCompare(secondUser.gender);
                    } else {
                        return secondUser.gender.localeCompare(firstUser.gender);
                    }
                } else if (sortBy === sortByValues.ADDRESS) {
                    const firstUserAddress = `${firstUser.address.city}${firstUser.address.address}`;
                    const secondUserAddress = `${secondUser.address.city}${secondUser.address.address}`;

                    if (sortDirection === sortDirectionValues.ASC) {
                        return firstUserAddress.localeCompare(secondUserAddress);
                    } else {
                        return secondUserAddress.localeCompare(firstUserAddress);
                    }
                }

                return 0;
            }),
        [sortDirection, sortBy, users],
    );

    const headers = useMemo(() => ['Full name', 'Age', 'Gender', 'Phone', 'Address'], []);

    const sortableHeaders = useMemo(
        () => [sortByValues.FULL_NAME, sortByValues.AGE, sortByValues.GENDER, sortByValues.ADDRESS],
        [],
    );

    const onThClick = (thName: string) => {
        onSort(thName as sortByValues);
    };

    if (isLoading) {
        return (
            <>
                <Table
                    headers={headers}
                    sortableHeaders={sortableHeaders}
                    minCellWidth={50}
                    className={classNames(cls.UsersTable, {}, [className, cls.loading])}
                    onThClick={onThClick}
                    currentSortHeader={sortBy}
                    sortDirection={sortDirection}
                />
                <div className={cls.loaderWrapper}>
                    <Loader />
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Table
                    headers={headers}
                    sortableHeaders={sortableHeaders}
                    minCellWidth={50}
                    className={classNames(cls.UsersTable, {}, [className])}
                    onThClick={onThClick}
                    currentSortHeader={sortBy}
                    sortDirection={sortDirection}
                />
                <div className={cls.error}>{error}</div>
            </>
        );
    }

    return (
        <Table
            headers={headers}
            sortableHeaders={sortableHeaders}
            minCellWidth={50}
            className={classNames(cls.UsersTable, {}, [className])}
            tableContent={sortedUsers.map(renderUsersTableItems)}
            onThClick={onThClick}
            currentSortHeader={sortBy}
            sortDirection={sortDirection}
        />
    );
});
