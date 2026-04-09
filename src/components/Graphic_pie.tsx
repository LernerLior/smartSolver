import { Pie, PieChart, Cell, Tooltip, Legend } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import '../styles/graphics.css';
import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CF6', '#FF6B6B', '#4BC0C0'];

export default function StraightAnglePieChart({ isAnimationActive = true }: { isAnimationActive?: boolean }) {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((raw: { category: string; total: number }[]) => {
        setData(raw.map((item) => ({ name: item.category, value: item.total })));
      })
      .catch((err) => console.error('Erro ao buscar categorias:', err));
  }, []);

  return (
    <div style={{ width: '100%', maxWidth: '700px', textAlign: 'center' }}>
      <h2 className="title">Total por categoria</h2>
      <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 2 }} responsive>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx="50%"
          cy="100%"
          outerRadius="120%"
          fill="var(--secondary-color)"
          label
          isAnimationActive={isAnimationActive}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [value, name]} />
        <Legend />
        <RechartsDevtools />
      </PieChart>
    </div>
  );
}