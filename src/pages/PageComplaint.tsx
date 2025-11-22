import { useNavigate, useParams } from 'react-router-dom';
import reclamacoes from '../data/complaintss.json';
import Complaint from './Complaint';
import { useMemo } from 'react';

type Row = {
  complaint_title: string;
  complaint_description: string;
  complaint_creation_date: string;
  complaint_solution: string;
  complaint_num: number;
  complaint_per: number;
};

export default function PageComplaint() {
  const navegacao = useNavigate();
  const { id: idParam } = useParams<{ id: string }>();
  const reclamacao = useMemo(() => {
    if (!idParam) return undefined;
    const lista = reclamacoes as Row[];
    const found = lista.find((r) => {
      const chave = r.complaint_num;
      return String(chave) === String(idParam);
    });
    return found;
  }, [idParam]);

  if (!reclamacao) {
    return (
      <div>
        <p>Reclamação não localizada</p>
        <button onClick={() => navegacao(-1)}>Voltar</button>
      </div>
    );
  }
  return (
    <Complaint
      complaintTitle={reclamacao.complaint_title}
      complaintText={reclamacao.complaint_description}
      complaintPercent={reclamacao.complaint_per}
      numComplaints={reclamacao.complaint_num}
      complaintsolution={reclamacao.complaint_solution}
    />
  );
}

