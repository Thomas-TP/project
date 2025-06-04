import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { ThemeProvider } from './components/theme/ThemeProvider';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/app/DashboardPage';
import TestPage from './pages/app/TestPage';
import TestResultPage from './pages/app/TestResultPage';
import BreathingPage from './pages/app/BreathingPage';
import MeditationPage from './pages/app/MeditationPage';
import ProfilePage from './pages/app/ProfilePage';
import SubscriptionPage from './pages/app/SubscriptionPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          
          {/* Auth Routes */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/app" element={<MainLayout />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="test" element={<TestPage />} />
              <Route path="test/result" element={<TestResultPage />} />
              <Route path="breathing" element={<BreathingPage />} />
              <Route path="meditation" element={<MeditationPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="subscription" element={<SubscriptionPage />} />
            </Route>
          </Route>
        </Routes>
        <Toaster position="top-center" />
      </Router>
    </ThemeProvider>
  );
}

export default App;