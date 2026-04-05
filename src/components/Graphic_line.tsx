import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';
import { useEffect, useState } from 'react';

type CategoryData = {
  category: string;
  total: number;
};

const COLORS = ['#8884d8', '#82ca9d', '#ff7300', '#0088fe', '#ff0080', '#00C49F', '#FFBB28'];

export default function LineC({ isAnimationActive = true }: { isAnimationActive?: boolean }) {
  const [categories, setCategories] = useState<string[]>([]);
  const [chartData, setChartData] = useState<Record<string, string | number>[]>([]);

  const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/categories`);
        const data: CategoryData[] = await res.json();

        const cats = data.map((d) => d.category);
        setCategories(cats);

        // Cada categoria vira um ponto no eixo X com seu total
        const formatted = data.map((d) => ({
          name: d.category,
          [d.category]: d.total,
        }));

        setChartData(formatted);
      } catch (err) {
        console.error('Erro ao buscar categorias:', err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <LineChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      data={chartData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {categories.map((cat, i) => (
        <Line
          key={cat}
          type="monotone"
          dataKey={cat}
          stroke={COLORS[i % COLORS.length]}
          isAnimationActive={isAnimationActive}
        />
      ))}
    </LineChart>
  );
}