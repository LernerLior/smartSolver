import { useNavigate, useParams } from 'react-router-dom';
import Complaint from './Complaint';
import { useMemo } from 'react';

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

  const reclamacao = useMemo(() => {
    if (!idParam) return undefined;
    const stored = localStorage.getItem('listaReclamacoes');
    if (!stored) return undefined;
    const lista: Row[] = JSON.parse(stored);
    return lista.find((r) => String(r.id) === String(idParam));
  }, [idParam]);

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