import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "./App.css";

function App() {
  const [moedaSelecionada, setMoedaSelecionada] = useState("AUD");
  const [moedaSiglas, setMoedaSigla] = useState([]);
  const [inputValor, setInputValor] = useState(0);

  const [cotacaoValor, setCotacaoValor] = useState(0);

  const dataOntem = dayjs().subtract(1, "day").format("MM-DD-YYYY");
  const dataHoje = dayjs().format("MM-DD-YYYY");

  useEffect(() => {
    fetch(
      `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?%24format=json&%24orderby=simbolo`
    )
      .then((response) => response.json())
      .then((moedaSiglas) => {
        setMoedaSigla(moedaSiglas.value);
      });

    fetch(
      `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda=%27${moedaSelecionada}%27&@dataInicial=%27${dataOntem}%27&@dataFinalCotacao=%27${dataHoje}%27&$top=10&$format=json&$select=cotacaoVenda`
    )
      .then((response) => response.json())

      .then((cotacaoValor) => {
        setCotacaoValor(cotacaoValor.value[0].cotacaoVenda);
      });
  }, [moedaSelecionada]);

  const totalConvertido = (cotacaoValor * inputValor).toFixed(2);
  const totaldeCompra = (inputValor / cotacaoValor).toFixed(2);

  return (
    <div className="App">
      <div className="container-title">
        <div className="effectglass"> </div>
        <div className="container-title effect">
          <div className="money"> </div>
          <h1> Cotação </h1>
          <p>
            {" "}
            Acompanhe a{" "}
            <strong> cotação das moedas mais importantes do mundo </strong> em
            tempo real e organize as suas finanças para a próxima viagem.{" "}
          </p>
        </div>
      </div>

      <div className="container">
        <label htmlFor="inputValorUsuario">Com R${inputValor} reais</label>

        <div className="input-value">
          <span> R$ </span>

          <input
            type="number"
            id="inputValor"
            onChange={(e) => setInputValor(e.target.value)}
          />
        </div>

        <label htmlFor="inputValorUsuario">Você conseguirá comprar:</label>
        {moedaSiglas.length > 0 ? (
          <select
            name="selectMoeda"
            onChange={(e) => setMoedaSelecionada(e.target.value)}
          >
            {moedaSiglas.map((moeda) => {
              return (
                <option key={moeda.simbolo} value={moeda.simbolo}>
                  {" "}
                  {moeda.simbolo} - {moeda.nomeFormatado}{" "}
                </option>
              );
            })}
          </select>
        ) : (
          <select name="selectMoeda">
            <option value="Selecione"> </option>
          </select>
        )}

        <div className="resultado">
          {" "}
          {totaldeCompra} {moedaSelecionada}{" "}
        </div>
      </div>
    </div>
  );
}
export default App;
