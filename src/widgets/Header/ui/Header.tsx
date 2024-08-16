import { ThemeSwitchButton } from 'features/ThemeSwitchButton';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Header.module.scss';

interface HeaderProps {
    className?: string;
}

export const Header = memo(function HeaderComponent({ className }: HeaderProps) {
    return (
        <header className={classNames(cls.Header, {}, [className])}>
            <h1 className={cls.title}>Таблица пользователей</h1>
            <ThemeSwitchButton className={cls.themeButton} />
        </header>
    );
});
