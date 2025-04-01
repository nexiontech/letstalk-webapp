import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage'; // Import DashboardPage
import NotFoundPage from './pages/NotFoundPage';  // Import NotFoundPage
import NavigationBar from './components/NavigationBar'; // Import NavigationBar
import './App.css'; // Keep existing App styles or modify as needed

function App() {
    return (
        <div className="App">
            <NavigationBar /> {/* Render the Navbar on all pages */}
            <main className="content"> {/* Mpho Optional: Add a main tag for content */}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} /> {/* Add Dashboard route */}
                    <Route path="*" element={<NotFoundPage />} /> {/* Catch-all for 404 */}
                </Routes>
            </main>
        </div>
    );
}

export default App;