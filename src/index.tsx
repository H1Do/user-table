import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { StoreProvider } from 'app/providers/StoreProvider/ui/StoreProvider';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import './app/styles/index.scss';
import { ThemeProvider } from 'app/providers/ThemeProvider';

const root = createRoot(document.getElementById('root')!);
root.render(
    <StoreProvider>
        <ErrorBoundary>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </ErrorBoundary>
    </StoreProvider>,
);
