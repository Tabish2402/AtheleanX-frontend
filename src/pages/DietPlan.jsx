import { useState } from "react";
import { useNavigate } from "react-router-dom";
 import { generateDiet } from "../api/diet";
export default function DietPlan() {
  const navigate = useNavigate();
const [goal, setGoal] = useState("Fat Loss");
const [dietType, setDietType] = useState("Balanced");
const [meals, setMeals] = useState("4 Meals");
const [activity, setActivity] = useState("Moderate");
const [loading, setLoading] = useState(false);
  // Form state
  const goalMap = {
  "Fat Loss": "fat_loss",
  "Muscle Gain": "muscle_gain",
  "Maintenance": "maintenance",
};

const dietTypeMap = {
  "Vegetarian": "vegetarian",
  "Balanced": "non_vegetarian",
  "High Protein": "non_vegetarian",
  "Low Carb": "non_vegetarian",
};

const mealsMap = {
  "3 Meals": 3,
  "4 Meals": 4,
  "5 Meals": 5,
  "6 Meals": 6,
};

const activityCaloriesMap = {
  Low: 1800,
  Moderate: 2200,
  High: 2600,
};



   

const handleGenerate = async () => {
  try {
    setLoading(true);
    await generateDiet({
      goal: goalMap[goal],
      diet_type: dietTypeMap[dietType],
      meals_per_day: mealsMap[meals],
      calorie_target: activityCaloriesMap[activity],
      allergies: [],
    });

    navigate("/app/diet/result");
  } catch (err) {
    console.error("Diet generation failed:", err);
  }
};


 

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="bg-white/10 border border-white/10 p-6 rounded-lg">
        <h2 className="text-3xl font-bold mb-2">Diet Plan</h2>
        <p className="text-white/80 text-xl">
          Configure your nutrition strategy to support your training goals.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Primary Form */}
        <div className="lg:col-span-2 bg-white/15 border border-white/20 p-10 rounded-xl">

          <h3 className="text-2xl font-bold mb-8">
            Nutrition Preferences
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Goal */}
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
                <option>Maintenance</option>
              </select>
            </div>

            {/* Diet Type */}
            <div>
              <label className="block mb-3 text-white/90 text-lg font-medium">
                Diet Preference
              </label>
              <select
                value={dietType}
                onChange={(e) => setDietType(e.target.value)}
                className="w-full px-5 py-4 rounded-md bg-bg text-white text-lg outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Balanced</option>
                <option>High Protein</option>
                <option>Low Carb</option>
                <option>Vegetarian</option>
              </select>
            </div>

            {/* Meals */}
            <div>
              <label className="block mb-3 text-white/90 text-lg font-medium">
                Meals per Day
              </label>
              <select
                value={meals}
                onChange={(e) => setMeals(e.target.value)}
                className="w-full px-5 py-4 rounded-md bg-bg text-white text-lg outline-none focus:ring-2 focus:ring-primary"
              >
                <option>3 Meals</option>
                <option>4 Meals</option>
                <option>5 Meals</option>
                <option>6 Meals</option>
              </select>
            </div>

            {/* Activity */}
            <div>
              <label className="block mb-3 text-white/90 text-lg font-medium">
                Daily Activity Level
              </label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full px-5 py-4 rounded-md bg-bg text-white text-lg outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Low</option>
                <option>Moderate</option>
                <option>High</option>
              </select>
            </div>

          </div>

          {/* CTA */}
           <button
            onClick={handleGenerate}
             disabled={loading}
            className="mt-12 px-12 py-5 rounded-lg bg-primary text-black font-bold text-xl hover:opacity-50 transition"
          >
           
              {loading ? "Crafting your exclusive diet plan...Kindly wait a few seconds" : "Create Diet Plan"}
          </button>
        </div>

        {/* Side Guidance */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-lg space-y-5">
          <h4 className="text-xl font-semibold">
            How this works
          </h4>

          <p className="text-white/80 text-lg leading-relaxed">
            The AI coach calculates calories and macros using your goal,
            activity level, and meal frequency to keep nutrition sustainable.
          </p>

          <ul className="text-white/70 text-lg list-disc list-inside space-y-2">
            <li>Calorie surplus or deficit</li>
            <li>Protein, carbs & fat split</li>
            <li>Flexible meal timing</li>
          </ul>
        </div>

      </div>

      {/* Bottom Support */}
      <div className="bg-white/5 border border-white/10 p-8 rounded-lg">
        <h3 className="text-3xl font-semibold mb-2">
          What you’ll get
        </h3>
        <p className="text-white/80 max-w-3xl text-2xl">
          A clear daily calorie target with macro guidance — simple enough to
          follow consistently and flexible enough to fit real life.
        </p>
      </div>

    </div>
  );
}
