import '../styles/dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BarChart3, AlertCircle } from 'lucide-react'; 
import LoadButton from '../components/LoadButton';
import LoadDataButton from '../components/LoadDataButton';
import type { Complaint } from '../types/complaint';

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000';
const PER_PAGE = 6;

export default function Dashboard() {
  const navegar = useNavigate();
  const [lista, setLista] = useState<Complaint[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchComplaints = async (p: number) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/latest?n=${PER_PAGE}&page=${p}`);
      const data = await res.json();
      setLista(data.items);
      setTotalPages(data.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints(page);
  }, [page]);

  const carregarbotao = (id: string) => navegar(`/complaint/${id}`);

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="logo-text">Painel Geral</span>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-group">
            <label>Ações</label>
            <LoadButton setLista={setLista} />
            <LoadDataButton setLista={setLista} />
          </div>

          <div className="nav-group">
            <label>Visualização</label>
            <button className="nav-item" onClick={() => navegar('/graphics')}>
              <BarChart3 size={18} />
              <span>Gráficos Analíticos</span>
            </button>
            <button className="nav-item warning" onClick={() => navegar('/importantcomplaints')}>
              <AlertCircle size={18} />
              <span>Urgentes</span>
            </button>
          </div>
        </nav>
      </aside>

      <div className="main-container">
        <header className="main-header">
          <h2>Dashboard</h2>
        </header>

        <main className="content-area">
          <section className="complaint-section">
            <div className="reclamation-header">
              <h3>Reclamações</h3>
              <div className="search-filter-container">
                <input type="text" placeholder="Pesquisar..." className="search-bar" />
                <button className="filter-btn">Filtrar</button>
              </div>
            </div>

            <div className="complaints-container">
              {loading ? (
                <div className="status-box">Carregando...</div>
              ) : lista.length === 0 ? (
                <div className="status-box">Nenhuma reclamação encontrada.</div>
              ) : (
                lista.map((reclamacao) => (
                  <div key={reclamacao.id} className="complaint-card">
                    <h4>{reclamacao.complaint_title}</h4>
                    <p>{reclamacao.complaint_description}</p>
                    <button className="read-more-btn" onClick={() => carregarbotao(reclamacao.id)}>
                      Ler mais e obter recomendações
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="pagination">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>&lt;</button>
              <span className="page-info">Página {page} de {totalPages}</span>
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>&gt;</button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}