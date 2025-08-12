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
function MainContent() {
  return (

    <main className="flex-1 p-8 pt-4 pb-0 ml-52">
      <Routes>
        <Route path="/vendor-visit" element={<VendorVisit />} />
        <Route
          path="/courier/:transtype"
          element={<Material />}
        />
        <Route path="/candidate-visit" element={<CandidateVisit />} />
        <Route path="/driver" element={<DriverPage />} />
        {/* Optional: Add a default redirect or home page */}
        <Route path="/" element={<Daashboard />} />
        <Route path="/vendors" element={<Daashboard />} />
      </Routes>
    </main>
    // </div>
  );
}

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