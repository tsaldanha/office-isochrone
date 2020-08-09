import React from 'react';

const Filters = ()=>(
    <>
        <Gender /> 
        <Hours />
        <Modal />
        <Minutes/>
    </>
);


const Gender = () => {

    return (
        <div>
        <p>Qual o genero do aluno?</p>
        <label>Todos</label>
        <input type="radio" name="gender" value="all" checked/>
        <label>Feminino</label>
        <input type="radio" name="gender" value="Female"/>
        <label>Masculino</label>
        <input type="radio" name="gender" value="Male"/>
    </div>
    )
}

const Hours = () => {

    return (
        <div>
            <p>Qual o turno da aula?</p>
            <label>Todos</label>
            <input type="radio" name="hours" value="all" checked/>
            <label>Manhã</label>
            <input type="radio" name="hours" value="morning"/>
            <label>Tarde</label>
            <input type="radio" name="hours" value="afternoon"/>
            <label>Noite</label>
            <input type="radio" name="hours" value="night"/>
        </div>
    )
}

const Modal = () => {
    return (
        <div>
            <p>Qual o meio de deslocamento?</p>
            <label>Caminhando</label>
            <input type="radio" name="modal" value="walking" />
            <label>Pedalando</label>
            <input type="radio" name="modal" value="cicyling" checked/>
        </div>
    )
}

const Minutes = () => {
    return (
        <div>
            <p>Qual o tempo desejado de deslocamento?</p>
            <label>10 min</label>
            <input type="radio" name="minutes" value="10" checked/>
            <label>20 min</label>
            <input type="radio" name="minutes" value="20" />
            <label>30 min</label>
            <input type="radio" name="minutes" value="30" />
        </div>
    )
}

export default Filters;