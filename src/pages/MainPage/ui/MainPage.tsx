import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

interface MainPageProps {
    className?: string;
}

export const MainPage = memo(function MainPage({ className }: MainPageProps) {
    return <div className={classNames('', {}, [className])}>Main Page</div>;
});
