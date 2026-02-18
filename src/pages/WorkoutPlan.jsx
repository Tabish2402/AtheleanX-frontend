import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateWorkout } from "../api/workout";

export default function WorkoutPlan() {
  const navigate = useNavigate();
  const [goal, setGoal] = useState("Fat Loss");
const [experience, setExperience] = useState("Beginner (0–6 months)");
const [days, setDays] = useState("3 Days");
const [equipment, setEquipment] = useState("Full Gym");
const [loading, setLoading] = useState(false);

  // Form state
  const goalMap = {
  "Fat Loss": "fat_loss",
  "Muscle Gain": "muscle_gain",
  Strength: "strength",
};

const experienceMap = {
  "Beginner (0–6 months)": "beginner",
  "Intermediate (6–24 months)": "intermediate",
  "Advanced (2+ years)": "advanced",
};

const equipmentMap = {
  "Home / Bodyweight": "bodyweight",
  "Dumbbells Only": "dumbbells",
  "Full Gym": "gym",
};


 const handleGenerate = async () => {
  try {
    setLoading(true);
    await generateWorkout({
      
      goal: goalMap[goal],
      experience: experienceMap[experience],
      days_per_week: parseInt(days),
      equipment: equipmentMap[equipment],
      injuries: [],
    });

    navigate("/app/workout/result");
  } catch (err) {
    console.error("Workout generation failed:", err);
  }
};


  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="bg-white/10 border border-white/10 p-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-2">Workout Plan</h2>
        <p className="text-white/80 text-xl">
          Build a training routine tailored to your body, goals, and schedule.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Primary Form */}
        <div className="lg:col-span-2 bg-white/15 border border-white/20 p-10 rounded-xl">

          <h3 className="text-2xl font-bold mb-8">
            Training Preferences
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Primary Goal */}
            <div>
              <label className="block mb-3 text-white/90 text-lg font-medium">
                Primary Goal
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full px-5 py-4 rounded-md bg-bg text-white text-lg outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Fat Loss</option>
                <option>Muscle Gain</option>
                <option>Strength</option>
                <option>General Fitness</option>
              </select>
            </div>

            {/* Training Experience */}
            <div>
              <label className="block mb-3 text-white/90 text-lg font-medium">
                Training Experience
              </label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-5 py-4 rounded-md bg-bg text-white text-lg outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Beginner (0–6 months)</option>
                <option>Intermediate (6–24 months)</option>
                <option>Advanced (2+ years)</option>
              </select>
            </div>

            {/* Days per Week */}
            <div>
              <label className="block mb-3 text-white/90 text-lg font-medium">
                Days per Week
              </label>
              <select
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full px-5 py-4 rounded-md bg-bg text-white text-lg outline-none focus:ring-2 focus:ring-primary"
              >
                <option>3 Days</option>
                <option>4 Days</option>
                <option>5 Days</option>
                <option>6 Days</option>
              </select>
            </div>

            {/* Equipment */}
            <div>
              <label className="block mb-3 text-white/90 text-lg font-medium">
                Equipment Access
              </label>
              <select
                value={equipment}
                onChange={(e) => setEquipment(e.target.value)}
                className="w-full px-5 py-4 rounded-md bg-bg text-white text-lg outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Full Gym</option>
                <option>Dumbbells Only</option>
                <option>Home / Bodyweight</option>
              </select>
            </div>

          </div>

          {/* CTA */}
          <button
            onClick={handleGenerate}
             disabled={loading}
            className="mt-12 px-12 py-5 rounded-lg bg-primary text-black font-bold text-xl hover:opacity-50 transition"
          >
           
              {loading ? "Generating your very own workout plan...Kindly wait a few seconds" : "Generate Workout"}
          </button>
        </div>

        {/* Side Guidance */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-lg space-y-5">
          <h4 className="text-xl font-semibold">
            How this works
          </h4>

          <p className="text-white/80 text-lg leading-relaxed">
            Your selections help the AI coach design a balanced workout split,
            exercise selection, and progression strategy.
          </p>

          <ul className="text-white/70 text-lg list-disc list-inside space-y-2">
            <li>Optimized volume & intensity</li>
            <li>Recovery-aware scheduling</li>
            <li>Beginner to advanced scaling</li>
            <li>Customizable workout structure</li>
          </ul>
        </div>

      </div>

      {/* Bottom Preview */}
      <div className="bg-white/5 border border-white/10 p-8 rounded-lg">
        <h3 className="text-3xl font-semibold mb-2">
          What you’ll get
        </h3>
        <p className="text-white/80 max-w-3xl text-2xl">
          A structured weekly workout plan with exercise selection, sets,
          reps, and progression logic — designed to be sustainable, effective,
          and aligned with your goals.
        </p>
      </div>

    </div>
  );
}
