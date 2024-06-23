import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import ErrorFallback from './ui/ErrorFallback.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.replace('/')}
      >
        <App />
      </ErrorBoundary>
    </HelmetProvider>
  </React.StrictMode>,
);
