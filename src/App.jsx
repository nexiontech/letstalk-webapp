import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import { Box } from '@mui/material';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
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
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './App.css';
import './styles/global.css';

// Protected route component
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    // If still loading auth state, show nothing (or could add a loading spinner)
    if (loading) {
        return <div className="loading-spinner">Loading...</div>;
    }

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // If authenticated, render the children
    return children;
};

function AppContent() {
    const { isAuthenticated } = useAuth();
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

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                width: '100%'
            }}
        >
            <NavigationBar />
            <Box
                component="main"
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    overflow: 'visible'
                }}
                className="main-content"
            >
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                    {/* Public routes */}
                    <Route path="/press-releases" element={<PressReleasesPage />} />

                    {/* Protected routes */}
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
                        <ProtectedRoute>
                            <UtilitiesPage />
                        </ProtectedRoute>
                    } />

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>

                {/* Thusong AI Chatbot - visible on all pages */}
                <ThusongAIChatbot initiallyMinimized={isChatbotInitiallyMinimized} />
            </Box>
            <Footer />
        </Box>
    );
}

function App() {
    return (
        <LanguageProvider>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </LanguageProvider>
    );
}

export default App;
