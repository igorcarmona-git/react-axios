import React, { useCallback, useEffect, useState } from "react";
import { API_PEOPLE } from "../utils/Api";

function People(){
    const [people, setPeople] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);

    const getPeople = useCallback(async () => {
        try {
            const response = await API_PEOPLE.get('/people');
            const data = response.data; // Desestruturação correta da resposta da API

            console.log(data);

            if(!data || data.length === 0) // Verificação correta de dados vazios
                setErrorMsg("Ocorreu um erro ao buscar dados de pessoas!");

            if(data && data.length > 0) // Verificação correta de dados não vazios
                setPeople(data);
        } catch (error) {
            console.error("Erro", error);
            setErrorMsg("Erro:", error);
        }
    }, []);

    useEffect(() =>{
        getPeople()
    }, [getPeople]);
    
    return(
        <div className="people">
            {!!errorMsg && <div className="error-msg">{errorMsg}</div>}
            {people.length > 0 && people.map((item) => {
                return(
                    <div className="card" key={item.id}>
                        {!!item.nome && <h1 className="nomePerson">{item.nome}</h1>}
                        {!!item.cpf && <h3 className="cpfPerson">{item.cpf}</h3>}
                        {!!item.status && <img src="../assets/tick.png" alt="status" />}
                    </div>
                )
            })}
        </div>
    )
}

export default People;
