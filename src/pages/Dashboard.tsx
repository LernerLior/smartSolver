import '../styles/dashboard.css';
import reclamacoes from '../data/complaintss.json';
import { useNavigate } from 'react-router-dom';
import PieChart from './PieChart';

type complaint = {
  complaint_title: string;
  complaint_description: string;
  complaint_creation_date: string;
  complaint_solution: string;
  complaint_num: number;
  complaint_per: number;
};

const dados = [
  { categoria: 'Reclamações', valor: 40 },
  { categoria: 'Elogios', valor: 25 },
  { categoria: 'Sugestões', valor: 20 },
  { categoria: 'Outros', valor: 15 },
];

export default function Dashboard() {
  const lista: complaint[] = reclamacoes;
  const navegar = useNavigate();

  const carregarbotao = (id: number) => {
    navegar(`/complaint/${id}`);
  };
  return (
    <div className="layout">
      <header>
        <h2>Dashboard</h2>
      </header>

      <aside>
        <nav>
          <ul className="nav-cards">
            <li className="nav-card">
              <a href="#">Carregar novos dados</a>
            </li>
            <li className="nav-card">
              <a href="#">Configurações</a>
            </li>
            <li className="nav-card">
              <a href="#">Ajuda</a>
            </li>
            <li className="nav-card">
              <a href="#">Perfil</a>
            </li>
            <li className="nav-card">
              <a href="#">Logout</a>
            </li>
          </ul>
        </nav>
      </aside>
      <main>
        <section className="tainer">
          <h3>Gráficos</h3>
          <div>
            <PieChart data={dados} />
          </div>
        </section>

        <section className="plaints">
          <h3>Reclamações</h3>
          <div className="complaints-container">
            {lista.map((reclamacao) => (
              <div key={reclamacao.complaint_num} className="complaint-card">
                <h4>{reclamacao.complaint_title}</h4>
                <p className="teste">{reclamacao.complaint_description}</p>
                <button
                  className="read-more-btn"
                  onClick={() => carregarbotao(reclamacao.complaint_num)}
                >
                  Ler mais e obter recomendações
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

