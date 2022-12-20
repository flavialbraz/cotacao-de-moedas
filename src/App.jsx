import { useEffect, useState } from 'react'

 
import './App.css'
 

function App() {
  const [valor, setValor] = useState([])
//  const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${hojeDia}%27&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao` 

  const [inputUserValor, setInputUserValor] = useState(0)
  

    const moedasCotacao = [

      {
        simbolo: "AUD",
        nomeFormatado: "Dólar australiano",
        valor: 4.2345345340,
        },
        {
        simbolo: "CAD",
        nomeFormatado: "Dólar canadense",
        valor: 3.20,
        },
        {
        simbolo: "CHF",
        nomeFormatado: "Franco suíço",
        valor: 2.20,
        },
        {
        simbolo: "DKK",
        nomeFormatado: "Coroa dinamarquesa",
        valor: 1.20,
        },
        {
        simbolo: "EUR",
        nomeFormatado: "Euro",
        valor: 1.20,
        }
  ]
   
    function handleChange(selectedOption) {
      for (const moeda of moedasCotacao) {
          if (moeda.simbolo === selectedOption) {
              setValor(moeda.valor);
              break;
          }
      }
    }

const valorFormatado = Number(valor).toFixed(2); 
const total = valorFormatado * inputUserValor;

const totalExibido = total.toLocaleString('pt-BR', { minimumFractionDigits: 2 });   

 
  return (
    <div className="App">
      <label 
      htmlFor="inputValorUsuario"> 
       Digite o valor que você gostaria de converter 
      </label>

      <input 
        type="number" 
        id="inputValorUsuario" 
        onChange={e => setInputUserValor(e.target.value)}
      /> 
     
      <select 
      name="selectMoeda" 
      onChange={ e => handleChange(e.target.value)}
      >

      <option 
      value="Selecione" 
      selected 
      disabled
      >
        Selecione 
      </option>

          {moedasCotacao.map(moedaAtual => {
                return (
                      <option key={moedaAtual.simbolo} value={moedaAtual.simbolo}> {moedaAtual.simbolo} </option>
                )
          })}
        </select>
          <h1> {totalExibido} </h1>
   
     </div>
  )
}
export default App