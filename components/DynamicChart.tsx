"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", keyPrice: 1.75, hatPrice: 3.20 },
  { name: "Feb", keyPrice: 1.79, hatPrice: 3.50 },
  { name: "Mar", keyPrice: 1.82, hatPrice: 3.65 },
  { name: "Apr", keyPrice: 1.88, hatPrice: 3.85 },
  { name: "May", keyPrice: 1.92, hatPrice: 4.10 },
  { name: "Jun", keyPrice: 1.89, hatPrice: 4.25 },
]

export default function DynamicChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#444444" />
        <XAxis dataKey="name" stroke="#999999" />
        <YAxis stroke="#999999" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#36393F',
            borderColor: '#444444',
            color: '#F2F3F5'
          }}
          labelStyle={{ color: '#F2F3F5' }}
        />
        <Line
          type="monotone"
          dataKey="keyPrice"
          name="Mann Co. Key (USD)"
          stroke="#CF7336"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="hatPrice"
          name="Unusual Hat (USD)"
          stroke="#B8383B"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
