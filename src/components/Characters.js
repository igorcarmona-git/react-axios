import { useCallback, useEffect, useState } from 'react';
import { API_RICK } from '../utils/Api'

function Characters() {
    const [characters, setCharacters] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
  
    //Utilizando useCallback, garantimos que a função getCharacters seja criada apenas uma vez durante a montagem do componente App e, a menos que suas dependências mudem, ela não será recriada nas renderizações subsequentes.
  
    const getCharacters = useCallback(async () => {
      try{
        const response = await API_RICK.get('/character');
        const data = response.data.results;
        console.log(data)
    
        if(!data || data.length === 0) // Verificação correta de dados vazios
          setErrorMsg("Ocorreu um erro ao buscar dados de pessoas!");
    
        // Se houver dados de personagens, definir os personagens no estado
        if(data && data.length > 0) // Verificação correta de dados não vazios
          setCharacters(data);
      }catch(error){
        console.log(error)
        setErrorMsg("Ocorreu um erro ao buscar dados.");
      }
      
    }, [])
  
    //Array de dependência
    useEffect(() => {
      getCharacters();
    }, [getCharacters]);
  
    //Renderização: O componente renderiza uma lista de personagens em forma de cartão. Se houver uma mensagem de erro, ela também é exibida.
    return (
      <div className="characters">
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
export default Characters;