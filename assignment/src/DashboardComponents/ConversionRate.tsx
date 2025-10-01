import { FunnelChart, Funnel, Tooltip, LabelList, ResponsiveContainer } from "recharts";
import { conversionRate } from "../mockData";

export default function ConversionRate() {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md w-full h-80">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Conversion Rate</h3>
        <button className="bg-orange-100 text-orange-600 px-3 py-1 rounded-lg text-sm">This Week</button>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <FunnelChart>
          <Tooltip />
          <Funnel
            dataKey="value"
            data={conversionRate}
            isAnimationActive
          >
            <LabelList position="right" fill="#000" stroke="none" dataKey="label" />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  );
}
