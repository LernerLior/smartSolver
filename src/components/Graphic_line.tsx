import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from 'recharts';
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

export default function LineC({ isAnimationActive = true }: { isAnimationActive?: boolean }) {
  const [categories, setCategories] = useState<string[]>([]);
  const [chartData, setChartData] = useState<Record<string, string | number>[]>([]);

  const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/categories-by-date`);
        const data: DateEntry[] = await res.json();

        // Coleta todas as categorias únicas
        const allCategories = Array.from(
          new Set(data.flatMap((d) => d.categories.map((c) => c.category)))
        );
        setCategories(allCategories);

        // Cada ponto no eixo X é uma data, com o total de cada categoria
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
    <LineChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      data={chartData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
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