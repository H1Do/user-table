import { useTheme } from 'app/providers/ThemeProvider';
import { memo } from 'react';
import ThemeIcon from 'shared/assets/icons/theme-icon.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';

interface ThemeSwitchButtonProps {
    className?: string;
}

export const ThemeSwitchButton = memo(function ThemeSwitchButtonComponent({ className }: ThemeSwitchButtonProps) {
    const { toggleTheme } = useTheme();

    return (
        <Button onClick={toggleTheme} className={className} theme={ButtonTheme.CLEAR}>
            <Icon Svg={ThemeIcon} width="40px" height="40px" />
        </Button>
    );
});
