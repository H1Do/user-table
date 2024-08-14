import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './SearchInput.module.scss';

interface SearchInputProps {
    className?: string;
    onSearchCallback: () => void;
    searchQuery?: string;
    setSearchQuery?: (value: string) => void;
    clearQuery?: () => void;
}

export const SearchInput = memo(function SearchInputComponent({
    className,
    onSearchCallback,
    searchQuery,
    setSearchQuery,
    clearQuery,
}: SearchInputProps) {
    const onSearch = useCallback(() => {
        onSearchCallback();
    }, [onSearchCallback]);

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
            {searchQuery && <Button onClick={clearQuery}>Очистить поиск</Button>}
        </form>
    );
});
