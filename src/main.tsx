
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/performance/ErrorBoundary';
import { reportWebVitals } from './utils/performance';

// Make sure we have a DOM element to render to
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Failed to find the root element");
} else {
  createRoot(rootElement).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}

// Report web vitals for performance monitoring
reportWebVitals();
