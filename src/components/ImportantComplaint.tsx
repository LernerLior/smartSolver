import '../styles/dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface ComplaintProps2{
  id: string;
  complaint_title: string;
  complaint_description: string;
  complaint_creation_date: string;
  complaint_solution: string;
  complaint_category: string;
  complaint_importance: number;
};

interface ComplaintProps{
  complaint_title: string,
  complaint_description: string,
  complaint_importance: number
};


export default function ImportantComplaint(props : ComplaintProps){
	
	

	return (

		<div className="complaint-card">
		
			{props.complaint_importance == 5 ? 
			(<div><h4>{props.complaint_title}</h4>
			<p className="teste">{props.complaint_description}</p>
			 <button className="read-more-btn" onClick={() => carregarbotao(reclamacao.id)}>
                    		Ler mais e obter recomendações
                  	</button></div>)
			: (<div></div>)
			}
		</div>
		
 	 );


}
