import { Button } from './Button';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Button component', () => {
    test('Button renders', () => {
        render(<Button>Click me</Button>);
        const buttonElement = screen.getByText('Click me');
        expect(buttonElement).toBeInTheDocument();
    });

    test('Button is disabled', () => {
        render(<Button disabled>Click me</Button>);
        const buttonElement = screen.getByText('Click me');
        expect(buttonElement).toBeDisabled();
    });

    test('Button has custom class', () => {
        render(<Button className="custom-class">Click me</Button>);
        const buttonElement = screen.getByText('Click me');
        expect(buttonElement).toHaveClass('custom-class');
    });

    test('Button calls onClick prop', () => {
        const onClick = jest.fn();
        render(<Button onClick={onClick}>Click me</Button>);
        const buttonElement = screen.getByText('Click me');
        fireEvent.click(buttonElement);
        expect(onClick).toHaveBeenCalled();
    });

    test('Button has data-testid attribute', () => {
        render(<Button data-testid="my-button">Click me</Button>);
        const buttonElement = screen.getByTestId('my-button');
        expect(buttonElement).toBeInTheDocument();
    });
});
