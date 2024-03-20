import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Api from './utils/Api'

function App() {
  const [characters, setCharacters] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  //Utilizando useCallback, garantimos que a função getCharacters seja criada apenas uma vez durante a montagem do componente App e, a menos que suas dependências mudem, ela não será recriada nas renderizações subsequentes.

  const getCharacters = useCallback(async () => {
    // Solicitar dados dos personagens à API
    const {data, error} = await Api.get('/character');

    // Se houver um erro, definir a mensagem de erro
    if(error){
      setErrorMsg("Ocorreu um erro ao obter os personagens!")
    }

    // Se houver dados de personagens, definir os personagens no estado
    if(data?.results){
      setCharacters(data.results)
    }
  }, [])

  //Array de dependência
  useEffect(() => {
    getCharacters();
  }, [getCharacters]);

  //Renderização: O componente renderiza uma lista de personagens em forma de cartão. Se houver uma mensagem de erro, ela também é exibida.
  return (
    <div className="App">
      {!!errorMsg && <div className='error-msg'>{errorMsg}</div>}
      {characters.length > 0 && characters.map((item) => {
        return(
          <div className='card'>
              {!!item?.image && <img src={item.image}></img>}
              <h3>{item.name}</h3>
          </div>
        )
      })}

      
    </div>
  );
}

//Por fim, o componente é exportado para ser utilizado em outros lugares.
export default App;
