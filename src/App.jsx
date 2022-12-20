import { useEffect, useState } from 'react'

 
import './App.css'
 

function App() {
  const [valor, setValor] = useState([])
  const [valorRetornado, setvalorRetornado] = useState([])
  const [codMoeda, setCodMoeda] = useState('')   
  const [inputUserValor, setInputUserValor] = useState(0)

    const dataAtual = new Date();
    const dia = dataAtual.getDate() 
    const mes = (dataAtual.getMonth() + 1) 
    const ano = dataAtual.getFullYear();
    const dataHoje = `-${mes}-${dia}-${ano}`;


    const moedasCotacao = [

      {
        simbolo: "AUD",
        nomeFormatado: "Dólar australiano",
        valor: 3.4566,
        },
        {
        simbolo: "CAD",
        nomeFormatado: "Dólar canadense",
        valor: 3.20,
        },
        {
        simbolo: "USD",
        nomeFormatado: "Dólar americano",
        valor: 5.1854,
        },
        {
        simbolo: "DKK",
        nomeFormatado: "Coroa dinamarquesa",
        valor: 3.81,
        },
        {
        simbolo: "EUR",
        nomeFormatado: "Euro",
        valor: 5.5162,
        }
  ]
   
    function handleChange(selectedOption) {
      for (const moeda of moedasCotacao) {
          if (moeda.simbolo === selectedOption) {
              setValor(moeda.valor);
              setCodMoeda(selectedOption) 
              break;
          }
      }
    }

 

const valorFormatado = Number(valor).toFixed(2); 
const total = valorFormatado * inputUserValor;

const totalExibido = total.toLocaleString('pt-BR', { minimumFractionDigits: 2 });   
  
// useEffect(() => {
//     fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaAberturaOuIntermediario(codigoMoeda=@codigoMoeda,dataCotacao=@dataCotacao)?@codigoMoeda=%27${codMoeda}%27&@dataCotacao=%27${dataHoje}%27&$format=json&$select=cotacaoCompra`)
//       .then(response => response.json())
//       .then(data => {
//         setvalorRetornado(data.results)
     
//       })
//   }, []) 

// let url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaAberturaOuIntermediario(codigoMoeda=@codigoMoeda,dataCotacao=@dataCotacao)?@codigoMoeda=%27${codMoeda}%27&@dataCotacao=%27${dataHoje}%27&$format=json&$select=cotacaoCompra`



  return (
    <div className="App">

<div className="container-title">   
<div className="effectglass"> </div>
      <div className="container-title effect"> 
      <div className="money"> </div>
        <h1> Cotação </h1>
        <p> Acompanhe a <strong> cotação das moedas mais importantes do mundo </strong> em tempo real e organize as suas finanças para a próxima viagem. </p>
      </div>
  </div>
         <div className="container"> 
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
        <div className="resultado">  R${totalExibido}  </div>
   
     </div>
     </div>
  )
}
export default App