import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DarkModeProvider } from './Context/DarkModeContext';
import { lazy } from 'react';
// import AppLayout from './ui/AppLayout';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Issues from './pages/Issues';

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
    </DarkModeProvider>
  );
}

export default App;
