import React, { useState } from "react";

import Login from "./components/Login";
import MapView from "./components/MapView";
import MapCreator from "./components/MapCreator";
import HomePage from "./components/HomePage";

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

  // التحكم في الصفحة الحالية: "home" | "view" | "creator" | "login"
  const [page, setPage] = useState("home");

  const handleLogin = (loggedUser) => {
    setUser(loggedUser);
    setPage("view");
  };

  const handleLogout = () => {
    localStorage.removeItem("mapgen_user");
    setUser(null);
    setPage("home");
  };

  // 1. عرض صفحة تسجيل الدخول
  if (page === "login" && !user) {
    return <Login onLogin={handleLogin} onBack={() => setPage("home")} />;
  }

  // 2. عرض صفحة منشئ الخرائط (MapCreator)
  if (page === "creator") {
    if (!user) {
      setPage("login");
      return null;
    }
    return <MapCreator onNavigate={setPage} onBack={() => setPage("home")} />;
  }

  // 3. عرض صفحة استعراض الخرائط (MapView)
  if (page === "view") {
    return (
      <MapView
        user={user}
        onLogout={handleLogout}
        onNavigate={setPage}
        onBack={() => setPage("home")}
      />
    );
  }

  // 4. الصفحة الرئيسية الافتراضية (HomePage)
  return (
    <HomePage
      user={user}
      onNavigate={(targetPage) => {
        if ((targetPage === "creator" || targetPage === "view") && !user) {
          setPage("login");
        } else {
          setPage(targetPage);
        }
      }}
      onLogout={handleLogout}
    />
  );
}

export default App;