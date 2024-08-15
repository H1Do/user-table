import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ButtonTheme {
    PRIMARY = 'primary',
    CLEAR = 'clear',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    disabled?: boolean;
    children: ReactNode;
    theme?: ButtonTheme;
}

export const Button = memo(function ButtonComponent(props: ButtonProps) {
    const { className, children, disabled, theme = ButtonTheme.PRIMARY, ...otherProps } = props;

    const mods: Mods = {
        [cls.disabled]: disabled,
    };

    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, [className, cls[theme]])}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
});
