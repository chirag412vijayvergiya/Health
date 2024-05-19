import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { DarkModeProvider } from './Context/DarkModeContext';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Issues from './pages/Issues';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AppLayout from './ui/AppLayout';
import Dashboard from './pages/Dashboard';
import Appointment from './pages/Appointment';
import Patient from './pages/Patient';
import Doctor from './pages/Doctors';
import Payments from './pages/Payments';
import Reviews from './pages/Reviews';
import PageNotFound from './pages/PageNotFound';
import Settings from './pages/Settings';
import ProtectedRoute from './ui/ProtectedRoute';
import Profile from './pages/Profile';
import DoctorProfile from './pages/DoctorProfile';
import { UserProvider } from './Context/UserRoleContext';

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
          <UserProvider>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="appointments" element={<Appointment />} />
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
          </UserProvider>
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
