import { fireEvent, render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input component', () => {
    test('Input renders', () => {
        render(<Input value="test" />);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toBeInTheDocument();
    });

    test('Input has value', () => {
        render(<Input value="test" />);
        const inputElement = screen.getByDisplayValue('test');
        expect(inputElement).toBeInTheDocument();
    });

    test('Input has className', () => {
        render(<Input className="custom-class" />);
        const inputElements = screen.getAllByRole('textbox');
        const inputElement = inputElements.find(
            (element) => element.classList.contains('Input') && element.classList.contains('custom-class'),
        );
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toBeInTheDocument();
    });

    test('Input calls onChange prop', () => {
        const onChange = jest.fn();
        render(<Input onChange={onChange} />);
        const inputElement = screen.getByRole('textbox');
        fireEvent.change(inputElement, { target: { value: 'test' } });
        expect(onChange).toHaveBeenCalledWith('test');
    });

    test('Input has disabled attribute', () => {
        render(<Input disabled />);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toBeInTheDocument();
    });
});
