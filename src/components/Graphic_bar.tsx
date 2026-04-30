import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CF6', '#FF6B6B', '#4BC0C0'];

export default function OriginBarChart({ isAnimationActive = true }: { isAnimationActive?: boolean }) {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/origin`)
      .then((res) => res.json())
      .then((raw: { origin: string; total: number }[]) => {
        setData(raw.map((item) => ({
          name: item.origin,
          value: item.total,
        })));
      })
      .catch((err) => console.error('Erro ao buscar origens:', err));
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
        <Tooltip
          formatter={(value, name) => [value, name]}
          contentStyle={{ borderRadius: 8, border: '1px solid #eee', fontSize: 12 }}
        />
        <Bar dataKey="value" radius={[4, 4, 0, 0]} isAnimationActive={isAnimationActive}>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}