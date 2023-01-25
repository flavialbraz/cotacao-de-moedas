import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "./styles/App.css";
import { Header } from "./components/Header";
import { SiglasMoedas } from "./components/SiglasMoedas";

function App() {
  
    // Esse estado inicia com a moeda AUD e altera toda vez que o usuário pega um novo valor selecionar uma nova moeda
  const [moedaSelecionada, setMoedaSelecionada] = useState("AUD");

  const handleMoedaSelecionada = (moeda) => {
    setMoedaSelecionada(moeda);
  };
    
  // Esse estado guarda o valor da moeda que foi 'pego' dentro da api e muda toda vez que a moeda é alterada. 
  const [cotacaoValor, setCotacaoValor] = useState(0);

 
  const dataOntem = dayjs().subtract(1, "day").format("MM-DD-YYYY");
  const dataHoje = dayjs().format("MM-DD-YYYY");
  const URIAPI = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda=%27${moedaSelecionada}%27&@dataInicial=%27${dataOntem}%27&@dataFinalCotacao=%27${dataHoje}%27&$top=10&$format=json&$select=cotacaoVenda`

  useEffect(() => {
    fetch(URIAPI)
      .then((response) => response.json())
      .then((cotacaoValor) => {
        setCotacaoValor(cotacaoValor.value.slice(-1)[0].cotacaoVenda); // Pega o último valor, sendo mais atualizado, da venda da moeda.
      });
  }, [moedaSelecionada]);
 
 
    
  // Esse estado guarda o valor digitado pelo usuário e altera o mesmo toda vez que o usuario digita. 
  const [inputValor, setInputValor] = useState(0);
  
  function handleChangeInput(e) {
    setInputValor(e.target.value)
  }



  const totalConvertido = (cotacaoValor * inputValor).toFixed(2);
  const totaldeCompra = (inputValor / cotacaoValor).toFixed(2);



  return (
    <div className="App">
      <Header />

      <div className="container">
        <label htmlFor="inputValorUsuario">Com R${inputValor} reais</label>

        <div className="input-value">
          <span> R$ </span>
          <input type="number" id="inputValor"
           onChange={handleChangeInput} 
          />
        </div>
      
        <SiglasMoedas 
           handleMoedaSelecionada={handleMoedaSelecionada}
        />

        <div className="resultado">
           {totaldeCompra} {moedaSelecionada} 
        </div>

      </div>
    </div>
  );
}
export default App;
