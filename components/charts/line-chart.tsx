'use client';

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  XAxisProps,
  YAxisProps,
} from 'recharts';

interface ChartData {
  name: string;
  value: number;
}

interface LineChartProps {
  data: ChartData[];
  height?: number;
}

// Define default props for axes to fix the warning
const defaultXAxisProps: Partial<XAxisProps> = {
  padding: { left: 0, right: 0 },
  tick: { fill: 'hsl(var(--foreground))' },
  stroke: 'hsl(var(--border))',
};

const defaultYAxisProps: Partial<YAxisProps> = {
  padding: { top: 20, bottom: 20 },
  tick: { fill: 'hsl(var(--foreground))' },
  stroke: 'hsl(var(--border))',
};

export function LineChart({ data, height = 300 }: LineChartProps) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="name"
            {...defaultXAxisProps}
          />
          <YAxis
            {...defaultYAxisProps}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--primary))' }}
            activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}