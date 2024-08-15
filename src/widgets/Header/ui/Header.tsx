import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Header.module.scss';
import { memo } from 'react';
import { ThemeSwitchButton } from 'features/ThemeSwitchButton';

interface HeaderProps {
    className?: string;
}

export const Header = memo(function HeaderComponent({ className }: HeaderProps) {
    return (
        <header className={classNames(cls.Header, {}, [className])}>
            <ThemeSwitchButton />
        </header>
    );
});
