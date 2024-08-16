import { memo, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
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
    const [isResetVisible, setIsResetVisible] = useState(false);

    const onSearch = useCallback(() => {
        onSearchCallback();
        setIsResetVisible(true);
    }, [onSearchCallback]);

    const onSubmit = useCallback(
        (event: React.FormEvent) => {
            event.preventDefault();
            onSearch();
        },
        [onSearch],
    );

    const onChange = useCallback(
        (value: string) => {
            setIsResetVisible(false);
            setSearchQuery?.(value);
        },
        [setSearchQuery],
    );

    return (
        <form onSubmit={onSubmit} className={classNames(cls.SearchInput, {}, [className])}>
            <div className={cls.container}>
                <Input
                    className={cls.input}
                    onChange={onChange}
                    value={searchQuery}
                    placeholder="Поиск пользователей"
                />
                <Button onClick={onSearch}>Найти</Button>
            </div>
            {searchQuery && isResetVisible && (
                <Button theme={ButtonTheme.CLEAR} onClick={clearQuery}>
                    Сбросить поиск
                </Button>
            )}
        </form>
    );
});
