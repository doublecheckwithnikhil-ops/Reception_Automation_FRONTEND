import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css'; // You'll create this file

// Import your page components
const Sidebar = React.lazy(() => import('./components/sidebar'));
const VendorVisit = React.lazy(() => import('./pages/VendorVisit'));
const CandidateVisit = React.lazy(() => import('./pages/CandidateVisit'));
const Material = React.lazy(() => import('./pages/Material'));
const DriverPage = React.lazy(() => import('./pages/Driver'));

// import React, { useState } from 'react';
import Login from './components/login';
import { AppProvider } from './context/AppContext';
import Daashboard from './pages/Dashboard';
import MainContent from './components/MainContent';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
})


// Main App component
function App() {
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <Sidebar />
      <MainContent />
      <Login />
    </div>
  );
}


// Main Content area (for demonstration)


const AppWrapper = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <AppProvider>
        <App />
      </AppProvider>
    </Router>
  </QueryClientProvider>
);


export default AppWrapper;