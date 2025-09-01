import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: '01/01', score: 10 },
  { date: '02/01', score: 20 },
  { date: '03/01', score: 15 },
];

export default function TestChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="score" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}
