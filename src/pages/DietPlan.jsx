import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLatestDiet } from "../api/diet";
import DietResult from "./DietResult";

export default function DietPlan() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkDiet() {
      try {
        const res = await getLatestDiet();
        if (!res) {
          navigate("/app/diet/create");
        }
      } catch {
        navigate("/app/diet/create");
      } finally {
        setChecking(false);
      }
    }
    checkDiet();
  }, []);

  if (checking) {
    return <p className="text-white/60 text-3xl animate-pulse">Checking your diet plan...</p>;
  }

  return <DietResult />;
}
