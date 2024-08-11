import { InputHTMLAttributes, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
}

export const Input = memo(function InputComponent({ className, value, onChange, ...otherProps }: InputProps) {
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <input
            type="text"
            value={value}
            onChange={onChangeHandler}
            {...otherProps}
            className={classNames(cls.Input, {}, [className])}
        />
    );
});
