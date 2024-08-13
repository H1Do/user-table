import { memo, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Page.module.scss';

interface PageProps {
    className?: string;
    children: ReactNode;
    alignCenter?: boolean;
}

export const Page = memo(function PageComponent({ className, children, alignCenter }: PageProps) {
    const Mods = {
        [cls.alignCenter]: alignCenter,
    };

    return <div className={classNames(cls.Page, Mods, [className])}>{children}</div>;
});
