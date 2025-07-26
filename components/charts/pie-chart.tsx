"use client"

import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

interface PieChartProps {
  data: { name: string; value: number }[]
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"]

export function PieChart({ data }: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <RechartsPieChart>
        <Pie data={data} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}
