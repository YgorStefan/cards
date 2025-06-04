import './ListaSuspensa.css'

const ListaSuspensa = (props) => {
    // console.log(props.itens)
    return (
        <div className="lista-suspensa">
            <label>
                {props.label}
            </label>
            <select
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