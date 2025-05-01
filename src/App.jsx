import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ApiLoginPage from './pages/ApiLoginPage';
import ApiRegisterPage from './pages/ApiRegisterPage';
import DashboardPage from './pages/DashboardPage';
import ServiceIssuesPage from './pages/ServiceIssuesPage';
import ReportIssuePage from './pages/ReportIssuePage'
import NotFoundPage from './pages/NotFoundPage';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import CommunityHub from './pages/CommunityHub';
import PressReleasesPage from './pages/PressReleasesPage';
import GovernmentServicesPage from './pages/GovernmentServicesPage';
import UtilitiesPage from './pages/UtilitiesPage';
import ThusongAIChatbot from './pages/ThusongAIChatbot';
import AboutUsPage from './pages/AboutUsPage';
import OurServicesPage from './pages/OurServicesPage';
import FAQPage from './pages/FAQPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import DashboardLayout from './layouts/DashboardLayout';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ApiAuthProvider, useApiAuth } from './contexts/ApiAuthContext';
import './App.css';
import './styles/global.css';

// Protected route component with dashboard layout
const ProtectedRoute = ({ children }) => {
    // Use API Auth if available, otherwise fall back to regular Auth
    const apiAuth = useApiAuth();
    const regularAuth = useAuth();

    // Determine which auth to use - prefer API auth if authenticated
    const auth = apiAuth.isAuthenticated ? apiAuth : regularAuth;

    const { isAuthenticated, loading } = auth;
    const location = useLocation();

    // If still loading auth state, show nothing (or could add a loading spinner)
    if (loading) {
        return <div className="loading-spinner">Loading...</div>;
    }

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    // If authenticated, render the children within the dashboard layout
    return <DashboardLayout>{children}</DashboardLayout>;
};

function AppContent() {
    // Use API Auth if available, otherwise fall back to regular Auth
    const apiAuth = useApiAuth();
    const regularAuth = useAuth();

    // Determine which auth to use - prefer API auth if authenticated
    const auth = apiAuth.isAuthenticated ? apiAuth : regularAuth;

    const { isAuthenticated } = auth;
    const location = useLocation();
    // State to control initial minimized state of the chatbot
    const [isChatbotInitiallyMinimized, setIsChatbotInitiallyMinimized] = useState(true);

    // Set chatbot to be initially minimized on mobile devices
    useEffect(() => {
        const handleResize = () => {
            setIsChatbotInitiallyMinimized(window.innerWidth < 768);
        };

        // Set initial state
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Check if the current route is a protected route that should use the dashboard layout
    const isProtectedRoute = [
        '/dashboard',
        '/service-issues',
        '/report-issue',
        '/services',
        '/utilities',
        '/CommunityHub'
    ].includes(location.pathname);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                width: '100%',
                overflow: isProtectedRoute ? 'hidden' : 'visible'
            }}
        >
            {/* Only show NavigationBar for non-protected routes */}
            {!isProtectedRoute && <NavigationBar />}

            <Box
                component="main"
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    overflow: isProtectedRoute ? 'hidden' : 'visible',
                    height: isProtectedRoute ? '100vh' : 'auto'
                }}
                className={isProtectedRoute ? '' : 'main-content'}
            >
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/api-login" element={<ApiLoginPage />} />
                    <Route path="/api-register" element={<ApiRegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                    {/* Public routes */}
                    <Route path="/press-releases" element={<PressReleasesPage />} />
                    <Route path="/about-us" element={<AboutUsPage />} />
                    <Route path="/our-services" element={<OurServicesPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                    <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                    <Route path="/cookie-policy" element={<CookiePolicyPage />} />

                    {/* Protected routes with Dashboard Layout */}
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/CommunityHub" element={
                        <ProtectedRoute>
                            <CommunityHub />
                        </ProtectedRoute>
                    } />
                    <Route path="/service-issues" element={
                        <ProtectedRoute>
                            <ServiceIssuesPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/report-issue" element={
                        <ProtectedRoute>
                            <ReportIssuePage />
                        </ProtectedRoute>
                    } />
                    <Route path="/services" element={
                        <ProtectedRoute>
                            <GovernmentServicesPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/utilities" element={
                        <Navigate to="/services" replace />
                    } />

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>

                {/* Thusong AI Chatbot - visible on all pages */}
                <ThusongAIChatbot initiallyMinimized={isChatbotInitiallyMinimized} />
            </Box>

            {/* Only show Footer for non-protected routes */}
            {!isProtectedRoute && <Footer />}
        </Box>
    );
}

function App() {
    return (
        <LanguageProvider>
            <AuthProvider>
                <ApiAuthProvider>
                    <AppContent />
                </ApiAuthProvider>
            </AuthProvider>
        </LanguageProvider>
    );
}

export default App;
