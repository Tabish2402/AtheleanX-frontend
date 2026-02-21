import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLatestWorkout } from "../api/workout";

export default function WorkoutResult() {
  const navigate = useNavigate();
 const [plan, setPlan] = useState(null);
const [loading, setLoading] = useState(true);


useEffect(() => {
  const fetchWorkout = async () => {
    try {
      const data = await getLatestWorkout();
      setPlan(data);
    } catch (err) {
      console.error("Failed to load workout:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchWorkout();
}, []);



if (loading) {
  return (
    <div className="h-full flex items-center ">
      <p className="text-white/60 text-5xl animate-pulse">
        Loading your workout plan…
      </p>
    </div>
  );
}

if (!plan) {
  return (
    <div className="h-full flex items-center justify-center">
      <p className="text-xl text-white/70">
        No workout plan found.
      </p>
    </div>
  );
}


  return (
    <div className="space-y-10 animate-fade-in">

      {/* Header */}
      <div className="bg-white/30 border border-white/50 p-6 rounded-xl">
        <h2 className="text-3xl font-bold mb-1">Your Workout Plan</h2>
        <p className="text-white/70 text-lg">
          {plan.split} · {plan.frequency} · {plan.duration}
        </p>
      </div>

    

      {/* Workout Days */}
      <div className="space-y-8">
        {plan.days.map((day) => (
          <div
            key={day.day}
            className="bg-white/10 border border-white/10 rounded-xl p-6
                       hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold mb-5">Day {day.day} · {day.focus}</h3>

            <div className="space-y-3">
              {day.exercises.map((ex) => (
                <div
                  key={ex.name}
                  className="flex justify-between items-center
                             bg-bg/60 px-5 py-4 rounded-lg"
                >
                  <span className="text-lg">{ex.name}</span>
                  <span className="text-white/70">
                    {ex.sets} × {ex.reps}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

     <div className="flex justify-between items-center">
  <button
    onClick={() => {
      
      navigate("/app/workout/create");
    }}
    className="px-6 py-6 text-xl rounded-lg bg-white/10 text-white/80
               hover:bg-white/20 transition"
  >
    Regenerate Plan
  </button>

  <button
    onClick={() => navigate("/app/coach")}
    className="px-8 py-6 text-xl rounded-lg bg-primary text-black font-semibold
               hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/30
               active:scale-[0.98] transition-all"
  >
    Discuss with AI Coach
  </button>
</div>

    </div>
  );
}
