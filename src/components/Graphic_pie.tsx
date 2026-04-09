import { Pie, PieChart, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import '../styles/graphics.css';

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
    <>
      <h2 className="title">Total de Reclamações por categoria</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="80%"
            outerRadius="80%"
            label={({ name, value }) => `${name}: ${value}`}
            labelLine={false}
            isAnimationActive={isAnimationActive}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [value, name]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}