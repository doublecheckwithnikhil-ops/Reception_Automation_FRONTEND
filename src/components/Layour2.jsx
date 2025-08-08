import React, { useState } from 'react';
import { Home, Package, Truck, Users, Menu, X } from 'lucide-react'; // Importing icons from lucide-react

// Main App component
export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <Sidebar />
      <MainContent />
    </div>
  );
}

// Sidebar component
function Sidebar() {
  const [isOpen, setIsOpen] = useState(true); // State to manage sidebar open/close

  // Function to toggle sidebar state
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Array of sidebar items
  const sidebarItems = [
    { name: 'Material', icon: <Package className="w-5 h-5" /> },
    { name: 'Vendor', icon: <Truck className="w-5 h-5" /> },
    { name: 'Driver', icon: <Users className="w-5 h-5" /> },
    { name: 'Candidate Visit', icon: <Home className="w-5 h-5" /> }, // Using Home icon as a placeholder for Candidate Visit
  ];

  return (
    <div
      className={`relative flex flex-col bg-gray-800 text-white transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64' : 'w-20'}
        md:w-64`} // Sidebar width for desktop (md and up) and mobile (collapsed/expanded)
    >
      {/* Sidebar Header with Toggle Button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isOpen && <h1 className="text-2xl font-semibold">Menu</h1>}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation Items */}
      <nav className="flex-1 px-2 py-4 space-y-2">
        {sidebarItems.map((item) => (
          <a
            key={item.name}
            href="#" // Placeholder for actual navigation links
            className="flex items-center p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
          >
            <div className="flex-shrink-0">
              {item.icon}
            </div>
            {isOpen && <span className="ml-3 text-lg whitespace-nowrap">{item.name}</span>}
          </a>
        ))}
      </nav>

      {/* Spacer to push content up if needed */}
      <div className="flex-grow"></div>

      {/* Optional: Footer or user info */}
      {isOpen && (
        <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
          <p>&copy; 2024 Your Company</p>
        </div>
      )}
    </div>
  );
}

// Main Content area (for demonstration)
function MainContent() {
  return (
    <main className="flex-1 p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome to the Dashboard</h2>
      <p className="text-gray-700 leading-relaxed">
        This is the main content area. The sidebar on the left is collapsible.
        Click the menu icon to expand or collapse it.
        The layout is responsive and adapts to different screen sizes.
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Card 1</h3>
          <p className="text-gray-600">Some descriptive text for card 1.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Card 2</h3>
          <p className="text-gray-600">Some descriptive text for card 2.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Card 3</h3>
          <p className="text-gray-600">Some descriptive text for card 3.</p>
        </div>
      </div>
    </main>
  );
}
