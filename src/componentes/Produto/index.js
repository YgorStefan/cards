import './Produto.css'

const Produto = ({nome, imagem, codigo ,corDeFundo}) => {
    return (
        <div className='produto'>
            <div className='cabecalho' style={{backgroundColor: corDeFundo}}>
                <img src={imagem} alt={nome}/>
            </div>
            <div className='rodape'>
                <h4>
                    {nome}
                </h4>
                <h5>
                    {codigo}
                </h5>
            </div>
        </div>

    )
}

export default Produto