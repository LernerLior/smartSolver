import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

type CategoryEntry = {
  category: string;
  total: string;
};

type DateEntry = {
  date: string;
  categories: CategoryEntry[];
};

const COLORS = ['#8884d8', '#82ca9d', '#ff7300', '#0088fe', '#ff0080', '#00C49F', '#FFBB28'];

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000';

export default function LineC({ isAnimationActive = true }: { isAnimationActive?: boolean }) {
  const [categories, setCategories] = useState<string[]>([]);
  const [chartData, setChartData] = useState<Record<string, string | number>[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/categories-by-date`);
        const data: DateEntry[] = await res.json();

        const allCategories = Array.from(
          new Set(data.flatMap((d) => d.categories.map((c) => c.category)))
        );
        setCategories(allCategories);

        const formatted = data.map((entry) => {
          const point: Record<string, string | number> = { date: entry.date };
          for (const cat of entry.categories) {
            point[cat.category] = Number(cat.total);
          }
          return point;
        });

        setChartData(formatted);
      } catch (err) {
        console.error('Erro ao buscar categorias por data:', err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 10, right: 24, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#888' }} />
        <YAxis tick={{ fontSize: 11, fill: '#888' }} allowDecimals={false} />
        <Tooltip
          contentStyle={{ borderRadius: 8, border: '1px solid #eee', fontSize: 12 }}
        />
        <Legend
          wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
          iconType="circle"
          iconSize={8}
        />
        {categories.map((cat, i) => (
          <Line
            key={cat}
            type="monotone"
            dataKey={cat}
            stroke={COLORS[i % COLORS.length]}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            isAnimationActive={isAnimationActive}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}