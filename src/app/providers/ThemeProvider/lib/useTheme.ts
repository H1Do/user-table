import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY, THEME, ThemeContext, ThemeContextProps } from './ThemeContext';

export function useTheme() {
    const { theme, setTheme } = useContext<ThemeContextProps>(ThemeContext);

    const toggleTheme = () => {
        const newTheme = theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
        setTheme?.(newTheme);
        document.body.className = newTheme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return { theme, toggleTheme };
}
