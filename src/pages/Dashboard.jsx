import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { getLatestWorkout } from "../api/workout";
import { getLatestDiet } from "../api/diet";


export default function Dashboard() {
    const navigate = useNavigate();
    const [latestWorkout, setLatestWorkout] = useState(null);
    const [hasDiet, setHasDiet] = useState(false);

 useEffect(() => {
  const checkPlans = async () => {
    // ---- WORKOUT ----
    try {
      const workout = await getLatestWorkout();
      setLatestWorkout(workout); // ✅ THIS WAS MISSING
    } catch (err) {
      setLatestWorkout(null);
    }

    // ---- DIET ----
    try {
      await getLatestDiet();
      setHasDiet(true);
    } catch (err) {
      setHasDiet(false);
    }
  };

  checkPlans();
}, []);





  return (
    <div className="min-h-full bg-bg/80 p-6 md:p-8 space-y-8">

      {/* Header Card */}
      <div className="bg-white/10 border border-white/10
backdrop-blur-sm shadow-lg shadow-black/20
 p-6 rounded-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300
">
        <h2 className="text-6xl font-bold">
          Welcome Athlete 👋
        </h2>
        <p className="text-white/80 mt-2 text-lg ">
          Track your progress and stay consistent with your goals.
        </p>
      </div>

      {/* Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 border border-white/10 border-t-8 border-t-primary p-6 rounded-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300
">
          <h3 className="text-lg font-semibold mb-1">
            Workout Status
          </h3>
<button
  onClick={() => navigate("/app/workout")}
  disabled={!latestWorkout}
  className={`text-left text-white/70 transition
    ${latestWorkout ? "hover:text-white underline" : "opacity-50 cursor-not-allowed"}`}
>
  {latestWorkout ? "Active workout plan" : "No active plan"}
</button>


        </div>

        <div className="bg-white/10 border border-white/10 border-t-8 border-t-primary p-6 rounded-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300
">
          <h3 className="text-lg font-semibold mb-1">
            Diet Status
          </h3>
        <button
  onClick={() => navigate("/app/diet")}
  disabled={!latestWorkout}
  className={`text-left text-white/70 transition
    ${latestWorkout ? "hover:text-white underline" : "opacity-50 cursor-not-allowed"}`}
>
  {latestWorkout ? "Active diet plan" : "No active plan"}
</button>

        </div>

        <div className="bg-white/10 border border-white/10 border-t-8 border-t-primary p-6 rounded-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300
">
          <h3 className="text-lg font-semibold mb-1">
            AI Coach
          </h3>
          <p className="text-white/70">
            Ready to assist
          </p>
        </div>
      </div>

      {/* Action Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 border border-white/10  p-6 rounded-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300
">
          <h3 className="text-xl font-semibold mb-2">
            Build Your Plan
          </h3>
          <p className="text-white/80 text-lg">
            Create a workout and diet plan tailored to your body and goals.
          </p>
        </div>

        <div className="bg-white/10 border border-white/10 p-6 rounded-lg flex items-center justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300
">
          <div>
            <h3 className="text-xl font-semibold mb-1">
              Talk to AI Coach
            </h3>
            <p className="text-white/80">
              Get guidance, motivation, and corrections.
            </p>
          </div>

        <button
  onClick={() => navigate("/app/coach")}
  className="px-6 py-4 text-lg rounded-lg bg-primary text-black font-semibold
           transition-all duration-200
           hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/30
           active:scale-[0.98]"

>
  Talk to Coach
</button>

        </div>
      </div>

      {/* Bottom Fill Card (visual balance) */}
      <div className="bg-white/5 border border-white/10 p-8 rounded-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300
">
        <h3 className="text-3xl font-semibold mb-2">
          Consistency beats intensity
        </h3>
        <p className="text-white/90 max-w-xl text-xl">
          Small disciplined actions done daily will compound into real physical
          transformation. Stay patient, stay focused.
        </p>
      </div>
       <div className="bg-white/5 border border-white/10 p-8 rounded-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300
">
        <h3 className="text-2xl font-semibold mb-2">
          PROCASTINATION IS THE ENEMY
        </h3>
        <p className="text-white/90 max-w-xl text-xl">
            JUST DO IT!
        </p>
      </div>

    </div>
  );
}
