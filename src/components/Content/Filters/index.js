import React, { useState }from 'react';

const Filters = ({action, config, map})=>{
    const [filters, setFilters] = useState(config);
    const executeFilters = (state) => {
        const nState = Object.assign(filters,state);
        setFilters(nState);
        executeISO();
    }
    const executeISO = () => {
        action(filters.lng, filters.lat, map, filters.profile, filters.time);
    }
    return(
    <>
        <Gender /> 
        <Hours />
        <Modal iso={executeFilters}/>
        <Minutes iso={executeFilters}/>
    </>
)};

const Gender = () => {
    const [check, setCheck] = useState("all");
    return (
        <div>
            <p>Qual o genero do aluno?</p>
            <label>Todos</label>
            <input type="radio" name="gender" value="all" checked={check === "all"} onChange={() => setCheck("all")}/>
            <br/>
            <label>Feminino</label>
            <input type="radio" name="gender" value="Female" checked={check === "Female"} onChange={() => setCheck("Female")}/>
            <br/>
            <label>Masculino</label>
            <input type="radio" name="gender" value="Male" checked={check === "Male"} onChange={() => setCheck("Male")}/>
        </div>
    )
}

const Hours = () => {
    const [check, setCheck] = useState("all");
    return (
        <div>
            <p>Qual o turno da aula?</p>
            <label>Todos</label>
            <input type="radio" name="hours" value="all" checked={check === "all"} onChange={() => setCheck("all")}/>
            <br/>
            <label>Manhã</label>
            <input type="radio" name="hours" value="morning" checked={check === "morning"} onChange={() => setCheck("morning")}/>
            <br/>
            <label>Tarde</label>
            <input type="radio" name="hours" value="afternoon" checked={check === "afternoon"} onChange={() => setCheck("afternoon")}/>
            <br/>
            <label>Noite</label>
            <input type="radio" name="hours" value="night"  checked={check === "night"} onChange={() => setCheck("night")}/>
        </div>
    )
}

const Modal = ({iso}) => {
    const [check, setCheck] = useState("walking");
    const executeFilter = (param) => {
        setCheck(param);
        const obj = {
            profile : param
        }
        iso(obj);
    }
    return (
        <div>
            <p>Qual o meio de deslocamento?</p>
            <label>Caminhando</label>
            <input type="radio" name="modal" value="walking" checked={check === "walking"} onChange={() => executeFilter("walking")}/>
            <br/>
            <label>Pedalando</label>
            <input type="radio" name="modal" value="cicyling" checked={check === "cycling"} onChange={() => executeFilter("cycling")}/>
            <br/>
        </div>
    )
}

const Minutes = ({iso}) => {
    const [check, setCheck] = useState(10);
    const executeFilter = (param) => {
        setCheck(param);
        const obj = {
            time : param
        }
        iso(obj);
    }
    return (
        <div>
            <p>Qual o tempo desejado de deslocamento?</p>
            <label>10 min</label>
            <input type="radio" name="minutes" value="10" checked={check === 10} onChange={() => executeFilter(10)}/>
            <br/>
            <label>20 min</label>
            <input type="radio" name="minutes" value="20" checked={check === 20} onChange={() => executeFilter(20)}/>
            <br/>
            <label>30 min</label>
            <input type="radio" name="minutes" value="30" checked={check === 30} onChange={() => executeFilter(30)}/>
            <br/>
        </div>
    )
}

export default Filters;