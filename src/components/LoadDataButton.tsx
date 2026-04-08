import { useState } from "react";
import type { Complaint } from '../types/complaint';

type LoadDataButtonProps = {
  setLista: (data: Complaint[]) => void;
};

export default function LoadDataButton({ setLista }: LoadDataButtonProps) {
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:8000";

  const fetchLatest = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/latest`);
      if (!res.ok) throw new Error(`Erro: ${res.status}`);
      const data: Complaint[] = await res.json();
      setLista(data);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar as reclamações");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={fetchLatest} disabled={loading} className="nav-card">
      {loading ? "Atualizando..." : "Atualizar dados"}
    </button>
  );
}