import React, { useState } from "react";

import Login from "./components/Login";
import MapView from "./components/MapView";
import MapCreator from "./components/MapCreator";

import "./App.css";

function App() {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("mapgen_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [page, setPage] = useState("view");

  const handleLogin = (loggedUser) => {
    setUser(loggedUser);
    setPage("view");
  };

  const handleLogout = () => {
    localStorage.removeItem("mapgen_user");
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  if (page === "creator") {
    return <MapCreator onNavigate={setPage} />;
  }

  return (
    <MapView
      user={user}
      onLogout={handleLogout}
      onNavigate={setPage}
    />
  );
}

export default App;