import '../styles/dashboard.css';
import { useNavigate } from 'react-router-dom';
import PieChart from './PieChart';
import { useState, useEffect } from 'react';
import LoadButton from '../components/LoadButton';
import LoadDataButton from '../components/LoadDataButton';

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

const dados = [
  { categoria: 'Problemas Técnicos', valor: 40 },
  { categoria: ' Serviço', valor: 25 },
  { categoria: 'Atendimento', valor: 20 },
  { categoria: 'Manutenção', valor: 15 },
  { categoria: 'Outros', valor: 15 },
];

export default function Dashboard() {
  const navegar = useNavigate();
  const storedData = localStorage.getItem('listaReclamacoes');
  const [lista, setLista] = useState<complaint[]>(storedData ? JSON.parse(storedData) : []);

  useEffect(() => {
    localStorage.setItem('listaReclamacoes', JSON.stringify(lista));
  }, [lista]);

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
              <LoadButton setLista={setLista} />
            </li>
            <li className="nav-card">
              <LoadDataButton setLista={setLista} />
            </li>
            <li className="nav-card"><a href="#">Configurações</a></li>
            <li className="nav-card"><a href="#">Ajuda</a></li>
            <li className="nav-card"><a href="#">Perfil</a></li>
            <li className="nav-card"><a href="#">Logout</a></li>
          </ul>
        </nav>
      </aside>

      <main>
        <section className="graph-section">
          <h3>Gráficos</h3>
          <div>
            <PieChart data={dados} />
          </div>
        </section>

        <section className="complaint-section">
          <div className="reclamation-header">
            <h3>Reclamações</h3>
            <div className="search-filter-container">
              <input 
                type="text" 
                placeholder="Pesquisar..." 
                className="search-bar" 
              />
              <button className="filter-btn">Filtrar</button>
            </div>
          </div>

          <div className="complaints-container">
            {lista.length === 0 ? (
              <div className="complaint-card">
                <p>Nenhuma reclamação carregada. Clique em "Carregar novos dados".</p>
              </div>
            ) : (
              lista.map((reclamacao) => (
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
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
