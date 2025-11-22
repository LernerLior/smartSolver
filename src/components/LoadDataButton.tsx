import { useState } from "react";

type complaint = {
  id: string;
  pk: string;
  complaint_title: string;
  complaint_description: string;
  complaint_creation_date: string;
  complaint_solution: string;
  complaint_num: number;
  complaint_per: number;
};

type LoadDataButtonProps = {
  setLista: (data: complaint[]) => void;
};

export default function LoadDataButton({ setLista }: LoadDataButtonProps) {
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:8000";

  const fetchLatest = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/latest`);
      if (!res.ok) throw new Error(`Erro: ${res.status}`);
      const data: complaint[] = await res.json();
      setLista(data);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar as reclamações");
    } finally {
      setLoading(false);
    }
  };

  return (
  <button
    onClick={fetchLatest}
    disabled={loading}
    className="nav-card"
  >
    {loading ? "Carregando..." : "Carregar novos dados"}
  </button>
  );
}