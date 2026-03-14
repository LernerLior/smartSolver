import { useNavigate, useParams } from 'react-router-dom';
import TwoLevelPieChart from './Graphics';
import { useMemo } from 'react';


export default function PageGraphics() {

  return (
      <div>	
      <header>
      	<h2>PageGraphics</h2>
      </header>
      <div>
      	<TwoLevelPieChart />
      </div>
      </div>
  );
}
