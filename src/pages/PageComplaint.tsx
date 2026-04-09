import { useNavigate, useParams } from 'react-router-dom';
import Complaint from './Complaint';
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000';

type Row = {
  complaint_title: string;
  complaint_description: string;
  complaint_creation_date: string;
  complaint_solution: string;
  complaint_category: string;
  id: string;
};

export default function PageComplaint() {
  const navegacao = useNavigate();
  const { id: idParam } = useParams<{ id: string }>();
  const [reclamacao, setReclamacao] = useState<Row | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!idParam) return;
    fetch(`${API_URL}/complaint/${idParam}`)
      .then((res) => {
        if (!res.ok) throw new Error('Não encontrado');
        return res.json();
      })
      .then(setReclamacao)
      .catch(() => setReclamacao(null))
      .finally(() => setLoading(false));
  }, [idParam]);

  if (loading) return <p>Carregando...</p>;

  if (!reclamacao) {
    return (
      <div>
        <p>Reclamação não localizada</p>
        <button onClick={() => navegacao(-1)}>⬅️</button>
      </div>
    );
  }

  return (
    <Complaint
      complaintTitle={reclamacao.complaint_title}
      complaintText={reclamacao.complaint_description}
      complaintsolution={reclamacao.complaint_solution}
      complaintcategory={reclamacao.complaint_category}
    />
  );
}