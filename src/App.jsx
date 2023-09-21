import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import {PageNotFound} from "./pages/PageNotFound";
import Dashboard from "./pages/Dashboard";
import Accueil from "./pages/Accueil";
import Missions from "./pages/Missions";
import MissionAdd from "./components/missions/MissionAdd";
import Personnel from "./pages/Personnel";
import PersonnelAdd from "./components/personnel/PersonnelAdd";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Accueil/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/personnel/"
        element={
          <ProtectedRoute>
            <Personnel/>
          </ProtectedRoute>
        }/>
      <Route
        path="/personnel/add/"
        element={
          <ProtectedRoute>
            <PersonnelAdd/>
          </ProtectedRoute>
        }/>
      <Route
        path="/missions/"
        element={
          <ProtectedRoute>
            <Missions/>
          </ProtectedRoute>
        }/>
      <Route
        path="/mission-add/"
        element={
          <ProtectedRoute>
            <MissionAdd/>
          </ProtectedRoute>
        }/>
      <Route
        path="/dashboard/"
        element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }/>
      <Route path="/login/" element={<Login/>}/>
      <Route path="/register/" element={<Register/>}/>
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
  );
}

export default App;
