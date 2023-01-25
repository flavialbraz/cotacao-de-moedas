import { useState, useEffect } from "react"
 
  


export function SiglasMoedas ({handleMoedaSelecionada}) {

   

  const moedaBRL = {
    simbolo: "BRL",
    nomeFormatado: "Real Brasileiro"
  }

    const [moedaSiglas, setMoedaSigla] = useState([]);
    const URIMOEDASAPI =  `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/Moedas?%24format=json&%24orderby=simbolo`
    useEffect(() => {
        fetch(URIMOEDASAPI)
          .then((response) => response.json())
          .then((moedaSiglas) => {
            setMoedaSigla(moedaSiglas.value.concat(moedaBRL));          });
      }, []);
       
      
      
    return (
    <div>
 

       <label htmlFor="inputValorUsuario">Você conseguirá comprar:</label>

        {moedaSiglas.length > 0 ? (
          <select
            name="selectMoeda"
            onChange={(e) => {
                handleMoedaSelecionada(e.target.value);
              }}
          >
            {moedaSiglas.map((moeda) => {
              return (
                <option key={moeda.simbolo} value={moeda.simbolo}>
                   
                  {moeda.simbolo} - {moeda.nomeFormatado} 
                </option>
              );
            })}
          </select>
        ) : (
          <select name="selectMoeda">
            <option value="Selecione"> </option>
          </select>
        )}

 


    </div>
    )
}


 