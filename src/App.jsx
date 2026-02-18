import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import WorkoutResult from "./pages/WorkoutResult";
import DietResult from "./pages/DietResult";
import api from "./api/axios";
import { useEffect } from "react";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";
import AICoach from "./pages/AICoach";
import WorkoutPlan from "./pages/WorkoutPlan";
import DietPlan from "./pages/DietPlan";

import AppLayout from "./layouts/AppLayout";

export default function App() {
  

  return (
    
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* App routes */}
        <Route path="/app" element={<AppLayout />}>
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="coach" element={<AICoach />} />

  {/* Workout */}
  <Route path="workout" element={<WorkoutPlan />} />
  <Route path="workout/result" element={<WorkoutResult />} />

  {/* Diet */}
  <Route path="diet" element={<DietPlan />} />
  <Route path="diet/result" element={<DietResult />} />
</Route>


      </Routes>
    </BrowserRouter>
  );
}
