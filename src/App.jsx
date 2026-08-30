import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "./firebase";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Health from "./pages/Health";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        }
      );

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p>Loading ReelSpace...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/health" element={<Health />} />

      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />

      <Route
        path="/"
        element={
          user ? (
            <Home user={user} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
