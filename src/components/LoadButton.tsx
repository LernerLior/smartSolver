import { useState } from "react";
import '../styles/load_buttons.css';
import type { Complaint } from '../types/complaint';

type LoadButtonProps = {
  setLista: (data: Complaint[]) => void;
};

export default function LoadButton({ setLista }: LoadButtonProps) {
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:8000";

  const carregarReclamacoes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/run-main`, { method: "POST" });
      const data = await res.json();

      if (data.status === "success") {
        const latestRes = await fetch(`${API_URL}/latest`);
        const latestData: Complaint[] = await latestRes.json();
        setLista(latestData);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar as reclamações");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={carregarReclamacoes} disabled={loading} className="nav-card">
      {loading ? "Buscando novos dados..." : "Buscar novos dados"}
    </button>
  );
}