import '../styles/dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoadButton from '../components/LoadButton';
import LoadDataButton from '../components/LoadDataButton';
import CustomActiveShapePieChart from '../components/Graphic';
import type { Complaint } from '../types/complaint';

export default function Dashboard() {
  const navegar = useNavigate();
  const storedData = localStorage.getItem('listaReclamacoes');
  const [lista, setLista] = useState<Complaint[]>(storedData ? JSON.parse(storedData) : []);

  useEffect(() => {
    localStorage.setItem('listaReclamacoes', JSON.stringify(lista));
  }, [lista]);

  const carregarbotao = (id: string) => {
    navegar(`/complaint/${id}`);
  };

  const ir_para_graf = () => {
    navegar(`/graphics`);
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
            <li className="nav-card" onClick={() => ir_para_graf()}>
              <div className="button">
              <h4>Gráficos</h4>
              <CustomActiveShapePieChart />
              </div>
            </li>
          </ul>
        </nav>
      </aside>

      <main>
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
                <div key={reclamacao.id} className="complaint-card">
                  <h4>{reclamacao.complaint_title}</h4>
                  <p className="teste">{reclamacao.complaint_description}</p>
                  <button
                    className="read-more-btn"
                    onClick={() => carregarbotao(reclamacao.id)}
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
