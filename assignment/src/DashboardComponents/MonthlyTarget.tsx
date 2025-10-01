import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function MonthlyTarget() {
  const percentage = 85;
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md flex flex-col items-center gap-2">
      <h3 className="font-semibold">Monthly Target</h3>
      <div className="w-32 h-32">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textColor: "#f97316",
            pathColor: "#f97316",
            trailColor: "#fcd34d",
          })}
        />
      </div>
      <p className="text-green-600 text-sm">+8.02% from last month</p>
      <p className="text-sm font-medium">Great Progress!</p>
      <p className="text-xs text-gray-500">Our achievement increased by $200,000; let's reach 100% next month.</p>
      <div className="flex justify-between w-full text-xs mt-2">
        <span>Target $600,000</span>
        <span>Revenue $510,000</span>
      </div>
    </div>
  );
}
