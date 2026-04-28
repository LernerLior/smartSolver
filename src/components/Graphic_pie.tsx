import { Pie, PieChart, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CF6', '#FF6B6B', '#4BC0C0'];

function formatName(name: string): string {
  const cleaned = name.replace('Problemas de ', '');
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

export default function StraightAnglePieChart({ isAnimationActive = true }: { isAnimationActive?: boolean }) {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((raw: { category: string; total: number }[]) => {
        setData(raw.map((item) => ({
          name: formatName(item.category),
          value: item.total,
        })));
      })
      .catch((err) => console.error('Erro ao buscar categorias:', err));
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          dataKey="value"
          data={data}
          cx="50%"
          cy="45%"
          outerRadius={100}
          innerRadius={40}
          paddingAngle={3}
          isAnimationActive={isAnimationActive}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [value, name]}
          contentStyle={{ borderRadius: 8, border: '1px solid #eee', fontSize: 12 }}
        />
        <Legend
          wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
          iconType="circle"
          iconSize={8}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}