import { useEffect, useState } from "react";
import { getLatestWorkout } from "../api/workout";
import WorkoutResult from "./WorkoutResult";
import { useNavigate } from "react-router-dom";

export default function WorkoutPlan() {
  const [checking, setChecking] = useState(true);
  const [hasWorkout, setHasWorkout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function check() {
      try {
        const res = await getLatestWorkout();
        if (res) {
          setHasWorkout(true);
        } else {
          navigate("/app/workout/create");
        }
      } catch {
        navigate("/app/workout/create");
      } finally {
        setChecking(false);
      }
    }
    check();
  }, []);

  if (checking) return <p className="text-white/60 text-3xl animate-pulse">Checking your workout plan...</p>;

  return <WorkoutResult />;
}
