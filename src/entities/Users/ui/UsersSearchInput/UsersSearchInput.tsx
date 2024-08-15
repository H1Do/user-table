import { SearchInput } from 'features/SearchInput/ui/SearchInput';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { getUsersSearchQuery } from '../../model/selectors/usersSelectors';
import { fetchUsers } from '../../model/services/fetchUsers';
import { usersActions } from '../../model/slice/usersSlice';

interface UsersSearchInputProps {
    className?: string;
}

export const UsersSearchInput = memo(function UsersSearchInputComponent({ className }: UsersSearchInputProps) {
    const searchQuery = useSelector(getUsersSearchQuery);
    const dispatch = useAppDispatch();
    const { setSearchQuery } = usersActions;

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
        <SearchInput
            className={className}
            onSearchCallback={onSearchCallback}
            setSearchQuery={onChangeQuery}
            searchQuery={searchQuery}
            clearQuery={onClearQuery}
        />
    );
});
