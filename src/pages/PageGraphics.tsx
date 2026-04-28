import '../styles/graphics.css';
import { useNavigate } from 'react-router-dom';
import LineC from '../components/Graphic_line';
import Pie from '../components/Graphic_pie';

// ─────────────────────────────────────────────
// Para adicionar um novo gráfico:
// 1. Importe o componente acima
// 2. Adicione um novo objeto ao array GRAPHS abaixo
// ─────────────────────────────────────────────
const GRAPHS = [
  { id: 'line',  title: 'Evolução Temporal',      component: <LineC /> },
  { id: 'pie',   title: 'Distribuição por Categoria', component: <Pie /> },
  // { id: 'bar', title: 'Reclamações por Origem', component: <Bar /> },
];

export default function PageGraphics() {
  const navegar = useNavigate();

  return (
    <div className="graphics-layout">

      <header className="graphics-header">
        <button className="back-button" onClick={() => navegar(-1)}>← Voltar</button>
        <h2>Gráficos Analíticos</h2>
      </header>

      <main className="graphics-main">
        {GRAPHS.map(({ id, title, component }) => (
          <section key={id} className="graph-card">
            <h3 className="graph-card-title">{title}</h3>
            <div className="graph-card-body">
              {component}
            </div>
          </section>
        ))}
      </main>

    </div>
  );
}