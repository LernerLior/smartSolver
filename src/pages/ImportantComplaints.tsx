import '../styles/graphics.css';
import ImportantComplaint from '../components/ImportantComplaint';

const complaints_list = [
  {
    "id": "1",
    "pk": "string",
    "complaint_title":"Cobrança Indevida",
    "complaint_description":"Fui cobrado(a) em meu extrato por uma \"Tarifa de Manutenção de Conta Premium\" no valor de R$ 45,00. Nunca solicitei ou autorizei a migração para um pacote de serviços Premium, meu contrato prevê apenas o pacote de serviços essenciais, sem custos. Solicito o estorno imediato do valor e o cancelamento desta cobrança recorrente.",
    "complaint_creation_date":"18/10/2025 às 20:31",
    "complaint_solution":"1. **Estorno e Correção Imediata:** Realizar o estorno imediato de R$ 45,00 para a conta do cliente, com a devida justificativa no extrato (Ex: \"Estorno Tarifa Indevida\").\n2. **Bloqueio da Cobrança:** Revisar o cadastro do cliente e a configuração do pacote de serviços, garantindo que a Tarifa Premium seja cancelada permanentemente, mantendo-o no pacote Essencial.\n3. **Análise de Causa_Raiz:** Auditar o processo de migração de pacotes para identificar a falha que gerou a cobrança (erro de sistema, erro humano ou contratação não solicitada) e aplicar correção sistêmica para evitar reincidência.",
    "complaint_num":"1",
    "complaint_importance": 5
  },
  {
    "id": "2",
    "pk": "stri2",
    "complaint_title":"Problemas de Pagamento",
    "complaint_description":"Realizei o pagamento de um boleto no valor de R$ 850,00 no dia 15/10/2025, às 14:30h, através do aplicativo do banco. O comprovante foi gerado, mas o beneficiário informou que o pagamento não foi compensado. O débito ocorreu em minha conta, mas o banco alega falha sistêmica e o boleto está em atraso. Exijo a confirmação urgente do repasse ou o estorno imediato para que eu possa pagar novamente sem multas.",
    "complaint_creation_date":"18/10/2025 às 09:54",
    "complaint_solution":"1. **Resolução Prioritária:** Abrir uma investigação urgente na área de TI/Compensação.\n2. **Comunicação e Estorno/Repasse:** Em até 4 horas úteis, confirmar o status:\na) Se o repasse puder ser forçado (compensação imediata), fazê-lo e enviar o comprovante ao cliente.\nb) Caso contrário, realizar o estorno imediato de R$ 850,00 para a conta do cliente.\n3. **Mitigação de Danos:** Emitir uma declaração oficial (carta ou e-mail com timbre do banco) ao cliente, assumindo a falha sistêmica e se responsabilizando por quaisquer multas e juros de atraso que o cliente venha a ter com o beneficiário do boleto.",
    "complaint_num": "2",
    "complaint_importance": 5
  }
]


export default function ImportantComplaints() {
  return (
    <div className="layout2">
      <header className="cab">
        <h2>Reclamações urgentes</h2>
      </header>

      <main className="main2">

	<div className="complaints-container">
		{complaints_list === 0 ? (<div className="complaint-card"><p>Nenhuma reclamação encontrada.</p></div>)
		: (complaints_list.map(function(item){
		
			<ImportantComplaint
			complaint_importance = {item.complaint_importance}
			complaint_title = {item.complaint_title}
			complaint_description = {item.complaint_description}/>
		
		}))  }
	
	</div>
        
      </main>

    </div>
  );
}
