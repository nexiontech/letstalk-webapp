import React, { useState } from 'react';
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
import './App.css';
import './styles/global.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
                    <Route
                        path="/login"
                        element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
                    />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/CommunityHub" element={<CommunityHub />} />
                    <Route path="/service-issues" element={<ServiceIssuesPage />} />
                    <Route path="/report-issue" element={<ReportIssuePage />} />
                    <Route path="/press-releases" element={<PressReleasesPage />} />
                    {isAuthenticated ? (
                        <Route path="/dashboard" element={<DashboardPage />} />
                    ) : (
                        <Route path="/dashboard" element={<Navigate to="/login" />} />
                    )}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Box>
            <Footer />
        </Box>
    );
}

export default App;
