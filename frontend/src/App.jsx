import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import LoadingSpinner from "./components/LoadingSpinner";

// protect routes that require authentication
const ProtectedRoute = ({children}) => {
  const { isAuthenticated, user } = useAuthStore();

  if(!isAuthenticated){
    return <Navigate to="/login" replace />
  }

  if(!user.isVerified) {
    return <Navigate to="/verify-email" replace />
  }

  return children;
}

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({children}) => {
  const {isAuthenticated, user} = useAuthStore();

  if(isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />
  }

  return children;
}

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if(isCheckingAuth) return <LoadingSpinner />;

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900"
    >
      <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />

      <Routes>
        <Route 
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          } 
        />
        <Route 
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }  
        />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;