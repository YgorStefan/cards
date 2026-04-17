import React from 'react'
import './ListaSuspensa.css'

const ListaSuspensa = (props) => {
    // console.log(props.itens)
    const id = `lista-${props.label?.toLowerCase().replace(/\s+/g, '-')}`
    return (
        <div className="lista-suspensa">
            <label htmlFor={id}>{props.label}</label>
            <select
                id={id}
                required={props.required}
                value={props.valor}
                onChange={evento => props.aoAlterado(evento.target.value)}
            >
                <option value="" disabled>Selecione</option>
                {props.itens.map(item => <option key={item}>{item}</option>)}
            </select>
        </div>
    )
}

export default ListaSuspensa
