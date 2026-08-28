import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth } from "./firebase";
import Login from "./pages/Login";
import Home from "./pages/Home";

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

        <p>
          Loading ReelSpace...
        </p>

      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <Home
      user={user}
      onLogout={handleLogout}
    />
  );
}

export default App;