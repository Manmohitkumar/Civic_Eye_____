
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/performance/ErrorBoundary';
import { reportWebVitals } from './utils/performance';
// Toast notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Make sure we have a DOM element to render to
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Failed to find the root element");
} else {
  createRoot(rootElement).render(
    <ErrorBoundary>
      <>
        <App />
        <ToastContainer position="top-right" autoClose={4000} />
      </>
    </ErrorBoundary>
  );
}

// Report web vitals for performance monitoring
reportWebVitals();
