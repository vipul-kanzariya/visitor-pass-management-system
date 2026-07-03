import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
import Dashboard from "./pages/Dashboard";
import Visitors from "./pages/Visitors";
import Pass from "./pages/Pass";
import NavBar from "./components/NavBar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      {token && <NavBar />}

      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />

        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/visitor"
          element={
            <ProtectedRoute>
              <Visitors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pass"
          element={
            <ProtectedRoute>
              <Pass />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
