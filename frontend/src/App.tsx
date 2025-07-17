import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { SystemDetails } from './pages/SystemDetails';
import { Settings } from './pages/Settings';
import { Alerts } from './pages/Alerts';
import { Security } from './pages/Security';
import { Storage } from './pages/Storage';
import { Activity } from './pages/Activity';
import { Systems } from './pages/Systems';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { useAuth } from './context/AuthContext';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="*"
              element={
                <PrivateRoute>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/systems" element={<Systems />} />
                      <Route path="/system/:id" element={<SystemDetails />} />
                      <Route path="/alerts" element={<Alerts />} />
                      <Route path="/security" element={<Security />} />
                      <Route path="/storage" element={<Storage />} />
                      <Route path="/activity" element={<Activity />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </Layout>
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;