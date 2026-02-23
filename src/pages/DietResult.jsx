import { useEffect, useState } from "react";
import { getLatestDiet } from "../api/diet";

import { useNavigate } from "react-router-dom";

export default function DietResult() {
  const navigate = useNavigate();
 const [plan, setPlan] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchDiet = async () => {
    try {
      const data = await getLatestDiet();
      setPlan(data);
    } catch (err) {
      console.error("Failed to load diet:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchDiet();
}, []);


if (loading) {
  return <p className="text-white/60 text-5xl animate-pulse">Loading diet plan…</p>;
}

if (!plan) {
  return <p className="text-white/70">No diet plan found.</p>;
}



  return (
    <div className="space-y-10 animate-fade-in">

      

      

      {/* Meals */}
     <div className="space-y-8">
  {plan.meals.map((meal) => (
    <div
      key={meal.meal}
      className="bg-white/10 border border-white/10 rounded-xl p-6"
    >
      <h3 className="text-2xl font-semibold mb-4">
        {meal.meal}
      </h3>

      <div className="space-y-3">
        {meal.items.map((item) => (
          <div
            key={item.name}
            className="flex justify-between items-center
                       bg-bg/60 px-5 py-4 rounded-lg"
          >
            <span className="text-lg">{item.name}</span>
            <span className="text-white/70">
              {item.calories} kcal · {item.protein} protein
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
      
      navigate("/app/diet/create");
    }}
    className="px-4 py-4 text-xl rounded-lg bg-white/10 text-white/80
               hover:bg-white/20 transition"
  >
    Regenerate Plan
  </button>

  <button
    onClick={() => navigate("/app/coach")}
    className="px-4 py-4 text-xl rounded-lg bg-primary text-black font-semibold
               hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/30
               active:scale-[0.98] transition-all"
  >
    Discuss with AI Coach
  </button>
</div>


    </div>
  );
}
