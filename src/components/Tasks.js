import { useCallback, useEffect } from "react";
import { API_TASKS } from "../utils/Api";

function Tasks(){
    const [tasks, setTasks] = useState({});

    const getTasks = useCallback(async () => {
        const {data} = await API_TASKS.get('/tasks');
        console.log(data);

        if(!data)
            setErrorMsg("Ocorreu um erro ao buscar dados de tarefas!")

        if(data?.id)
            setTasks(data);
    })

    useEffect(() =>{
        getTasks()
    }, [getTasks]);
}

export default Tasks;