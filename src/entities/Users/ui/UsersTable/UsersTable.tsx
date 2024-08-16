import { getUsersSortBy, getUsersSortDirection } from 'entities/Users/model/selectors/usersSelectors';
import { usersActions } from 'entities/Users/model/slice/usersSlice';
import { memo, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { sortDirectionValues } from 'shared/config/types/sort';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Loader } from 'shared/ui/Loader/Loader';
import { Table } from 'shared/ui/Table/Table';
import { sortByValues, tableColumnsValues, User } from '../../model/types/users';
import { UsersTableItem } from '../UsersTableItem/UsersTableItem';
import { UsersTableModal } from '../UsersTableModal/UsersTableModal';
import cls from './UsersTable.module.scss';

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
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const renderUsersTableItems = useCallback((user: User) => {
        return (
            <UsersTableItem
                className={cls.item}
                user={user}
                key={user.id}
                onModalOpen={() => {
                    setIsModalOpened(true);
                    setSelectedUser(user);
                }}
            />
        );
    }, []);

    const onSort = useCallback(
        (newSortBy: sortByValues) => {
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
        },
        [dispatch, setSortBy, setSortDirection, sortBy, sortDirection],
    );

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

    const headers = useMemo(
        () => [
            tableColumnsValues.FULL_NAME,
            tableColumnsValues.AGE,
            tableColumnsValues.GENDER,
            tableColumnsValues.PHONE,
            tableColumnsValues.ADDRESS,
        ],
        [],
    );

    const sortableHeaders = useMemo(
        () => [sortByValues.FULL_NAME, sortByValues.AGE, sortByValues.GENDER, sortByValues.ADDRESS],
        [],
    );

    const onThClick = useCallback(
        (thName: string) => {
            onSort(thName as sortByValues);
        },
        [onSort],
    );

    const isTableVisible = !isLoading && !error && users.length;

    const isEmptyUsers = !isLoading && !error && !users.length;

    return (
        <>
            <Table
                headers={headers}
                sortableHeaders={sortableHeaders}
                minCellWidth={50}
                className={classNames(cls.UsersTable, {}, [className])}
                tableContent={sortedUsers.map(renderUsersTableItems)}
                onThClick={onThClick}
                currentSortHeader={sortBy}
                sortDirection={sortDirection}
                hidden={!isTableVisible}
            />
            <UsersTableModal isOpen={isModalOpened} onClose={() => setIsModalOpened(false)} user={selectedUser} />
            {isLoading ? (
                <div className={cls.loaderWrapper}>
                    <Loader />
                </div>
            ) : (
                ''
            )}
            {error ? <div className={cls.error}>Произошла ошибка при загрузке пользователей</div> : ''}
            {isEmptyUsers ? <div className={cls.empty}>Пользователей не найдено</div> : ''}
        </>
    );
});
