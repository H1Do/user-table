import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import cls from './PageError.module.scss';

interface PageErrorProps {
    className?: string;
}

export const PageError = memo(function PageErrorComponent({ className }: PageErrorProps) {
    const reloadPage = () => {
        location.reload();
    };

    console.log(cls);

    return (
        <div className={classNames(cls.PageError, {}, [className])}>
            <p>Произошла непредвиденная ошибка</p>
            <Button onClick={reloadPage}>Обновить страницу</Button>
        </div>
    );
});
