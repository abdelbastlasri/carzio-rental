import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import AdminDashboard from './AdminDashboard';
import AdminBookings from './AdminBookings';
import AdminPricing from './AdminPricing';

export default function AdminRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('admin_token'));
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('admin_token'));
  }, [location.pathname]);

  if (location.pathname === '/login') {
    if (isLoggedIn) return <Navigate to="/dashboard" replace />;
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/bookings" element={<AdminBookings />} />
        <Route path="/pricing" element={<AdminPricing />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
}
