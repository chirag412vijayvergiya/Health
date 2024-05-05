import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { DarkModeProvider } from './Context/DarkModeContext';
import { lazy } from 'react';
// import AppLayout from './ui/AppLayout';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Issues from './pages/Issues';
import { Toaster } from 'react-hot-toast';
// import { AuthProvider } from './Context/Authcontext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import AppLayout from './ui/AppLayout';
// import { UserProvier } from './Context/UserConstext';

// const HomePage = lazy(() => import('./pages/HomePage'));
// const Login = lazy(() => import('./pages/Login'));

// axios.defaults.baseURL = 'http://127.0.0.1:8000';
// axios.defaults.withCredentials = true;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}></Route>
            <Route index element={<Navigate replace to="home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="login" element={<Login />} />
            <Route path="issues" element={<Issues />} />
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
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
