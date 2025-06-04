import './CampoTexto.css'

const CampoTexto = (props) => {
    // console.log(props.label)
    // let valor = ''

    const aoDigitado = (evento) => {
        props.aoAlterado(evento.target.value)
    }

    return (
        <div className="campo-texto">
            <label>
                {props.label}
            </label>
            <input value={props.valor} onChange={aoDigitado} required={props.required} placeholder={props.placeholder} />
        </div>
    )
}

export default CampoTexto