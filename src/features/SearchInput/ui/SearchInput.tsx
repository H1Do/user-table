import { memo, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './SearchInput.module.scss';
import { Loader } from 'shared/ui/Loader/Loader';

interface SearchInputProps {
    className?: string;
    onSearchCallback: (value: string) => void;
}

export const SearchInput = memo(function SearchInputComponent({ className, onSearchCallback }: SearchInputProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const onSearch = useCallback(() => {
        onSearchCallback(searchQuery);
    }, [onSearchCallback, searchQuery]);

    const onSubmit = useCallback(
        (event: React.FormEvent) => {
            event.preventDefault();
            onSearch();
        },
        [onSearch],
    );

    return (
        <form onSubmit={onSubmit} className={classNames(cls.SearchInput, {}, [className])}>
            <Input onChange={setSearchQuery} value={searchQuery} placeholder="Поиск пользователей" />
            <Button onClick={onSearch}>Найти</Button>
        </form>
    );
});
