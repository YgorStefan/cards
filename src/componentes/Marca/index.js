import Produto from "../Produto"
import './Marca.css'

const Marca = (props) => {
    return (
        (props.produtos.length > 0) ? <section className="marca" style={{backgroundColor: props.corPrimaria}} >
            <h3 style={{borderColor: props.corSecundaria }}>{props.nome}</h3>
            <div className='produtos'>
            {props.produtos.map(produto => <Produto corDeFundo={props.corSecundaria} key={produto.nome} nome={produto.nome} codigo={produto.codigo} imagem={produto.imagem}/>)}
            </div>
        </section>
        : ''
    )
}

export default Marca