import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DarkModeProvider } from './Context/DarkModeContext';
import { lazy } from 'react';
// import AppLayout from './ui/AppLayout';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Issues from './pages/Issues';
import { Toaster } from 'react-hot-toast';

// const HomePage = lazy(() => import('./pages/HomePage'));
// const Login = lazy(() => import('./pages/Login'));

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/issues" element={<Issues />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
            dismiss: 'click',
          },
          error: {
            duration: 5000,
            dismiss: 'click',
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'bg-gray-300', // Background color grey-300
            color: 'text-gray-900', // Text color grey-900
          },
        }}
      />
    </DarkModeProvider>
  );
}

export default App;
