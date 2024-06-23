import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// import { GoogleOAuthProvider } from '@react-oauth/google';
import { Suspense, lazy } from 'react';
import { DarkModeProvider } from './Context/DarkModeContext';

import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppLayout from './ui/AppLayout';
import ProtectedRoute from './ui/ProtectedRoute';
import MainHeader from './ui/WithoutProtected/Header/MainHeader';
import DefaultSpinner from './ui/DefaultSpinner';
import ChatPage from './pages/ChatPage';
import { ChatProvider } from './Context/ChatContext';

const HomePage = lazy(() => import('./pages/HomePage'));
const Login = lazy(() => import('./pages/Login'));
const Issues = lazy(() => import('./pages/Issues'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Appointment = lazy(() => import('./pages/Appointment'));
const Patient = lazy(() => import('./pages/Patient'));
const Doctor = lazy(() => import('./pages/Doctors'));
const Payments = lazy(() => import('./pages/Payments'));
const Reviews = lazy(() => import('./pages/Reviews'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const Settings = lazy(() => import('./pages/Settings'));
const Profile = lazy(() => import('./pages/Profile'));
const DoctorProfile = lazy(() => import('./pages/DoctorProfile'));
const Appointments = lazy(() => import('./pages/Appointments'));
const Success = lazy(() => import('./pages/Success'));
const Cancel = lazy(() => import('./pages/Cancel'));

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
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <MainHeader />
          <Suspense fallback={<DefaultSpinner />}>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="success" element={<Success />} />
                <Route path="cancel" element={<Cancel />} />
                <Route path="appointments" element={<Appointments />} />
                <Route
                  path="chat"
                  element={
                    <ChatProvider>
                      <ChatPage />
                    </ChatProvider>
                  }
                />
                <Route
                  path="appointments/:appointmentId"
                  element={<Appointment />}
                />
                <Route path="patients" element={<Patient />} />
                <Route path="doctors" element={<Doctor />} />
                <Route path="doctors/:doctorId" element={<DoctorProfile />} />
                <Route path="payments" element={<Payments />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="settings" element={<Settings />} />
                <Route path="account" element={<Profile />} />
              </Route>
              <Route index element={<Navigate replace to="home" />} />
              <Route path="home" element={<HomePage />} />
              <Route path="login" element={<Login />} />
              <Route path="issues" element={<Issues />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
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
              backgroundColor: 'bg-gray-300',
              color: 'text-gray-900',
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
