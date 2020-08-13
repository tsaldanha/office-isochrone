import React, { useState }from 'react';

const Filters = ({action, config, map, dataset})=>{
    const [filters, setFilters] = useState(config);
    const filterLayer = (state) => {
        setFilters(Object.assign(filters, state));
        let newdata = {
            type: "FeatureCollection",
            features: [],
        }
        newdata.features = dataset.data.features.filter((student) => {
            return (filters.gender ==="all" || student.properties.gender === filters.gender) && (filters.hours ==="all" || student.properties.hours === filters.hours);
        });
        map.getSource("students").setData(newdata);
    }
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
        <Gender filterAction = {filterLayer} /> 
        <Hours filterAction = {filterLayer} />
        <Modal iso={executeFilters}/>
        <Minutes iso={executeFilters}/>
    </>
)};

const Gender = ({ filterAction }) => {
    const [check, setCheck] = useState("all");
    const executeFilter = (param) => {
        setCheck(param);
        const obj = {
            gender : param
        }
        filterAction(obj);
    }
    return (
        <div>
            <p>Qual o genero do aluno?</p>
            <label for="gender-all">Todos</label>
            <input type="radio" name="gender" id="gender-all" value="all" checked={check === "all"} onChange={() => executeFilter("all")}/>
            <br/>
            <label for="gender-female">Feminino</label>
            <input type="radio" name="gender" id="gender-female" value="female" checked={check === "female"} onChange={() => executeFilter("female")}/>
            <br/>
            <label for="gender-male">Masculino</label>
            <input type="radio" name="gender" id="gender-male" value="fale" checked={check === "male"} onChange={() => executeFilter("male")}/>
        </div>
    )
}

const Hours = ({ filterAction }) => {
    const [check, setCheck] = useState("all");
    const executeFilter = (param) => {
        setCheck(param);
        const obj = {
            hours : param
        }
        filterAction(obj);
    }
    return (
        <div>
            <p>Qual o turno da aula?</p>
            <label for="hours-all">Todos</label>
            <input type="radio" name="hours" id="hours-all" value="all" checked={check === "all"} onChange={() => executeFilter("all")}/>
            <br/>
            <label for="hours-morning">Manhã</label>
            <input type="radio" name="hours" id="hours-morning" value="morning" checked={check === "morning"} onChange={() => executeFilter("morning")}/>
            <br/>
            <label for="hours-afternoon">Tarde</label>
            <input type="radio" name="hours" id="hours-afternoon" value="afternoon" checked={check === "afternoon"} onChange={() => executeFilter("afternoon")}/>
            <br/>
            <label for="hours-night">Noite</label>
            <input type="radio" name="hours" id="hours-night" value="night"  checked={check === "night"} onChange={() => executeFilter("night")}/>
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
            <label for="walking">Caminhando</label>
            <input type="radio" name="modal" id="walking" value="walking" checked={check === "walking"} onChange={() => executeFilter("walking")}/>
            <br/>
            <label for="cycling">Pedalando</label>
            <input type="radio" name="modal" id="cycling" value="cicyling" checked={check === "cycling"} onChange={() => executeFilter("cycling")}/>
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
            <label for="min-10">10 min</label>
            <input type="radio" name="minutes" id="min-10" value="10" checked={check === 10} onChange={() => executeFilter(10)}/>
            <br/>
            <label for="min-20">20 min</label>
            <input type="radio" name="minutes" id="min-20" value="20" checked={check === 20} onChange={() => executeFilter(20)}/>
            <br/>
            <label for="min-30">30 min</label>
            <input type="radio" name="minutes" id="min-30" value="30" checked={check === 30} onChange={() => executeFilter(30)}/>
            <br/>
        </div>
    )
}

export default Filters;