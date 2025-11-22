import { useState } from "react";
import '../styles/load_buttons.css';
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

type LoadButtonProps = {
  setLista: (data: complaint[]) => void;
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
        const latestData: complaint[] = await latestRes.json();
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
  <button
    onClick={carregarReclamacoes}
    disabled={loading}
    className="nav-card"
  >
    {loading ? "Executando o Cralwer..." : "Executar o Cralwer"}
  </button>
  );
}
