import './Formulario.css'
import CampoTexto from "../CampoTexto"
import ListaSuspensa from "../ListaSuspensa"
import Botao from "../Botao"
import {useState} from "react"

const Formulario = (props) => {

    const [nome, setNome] = useState('')
    const [codigo, setCodigo] = useState('')
    const [imagem, setImagem] = useState('')
    const [marca, setMarca] = useState('')

    const aoSalvar = (evento) => {
        evento.preventDefault()
        props.aoProdutoCadastrado({
            nome,
            codigo,
            imagem,
            marca
        })
        setNome('')
        setCodigo('')
        setImagem('')
        setMarca('')
    }

    return (
        <section className="formulario">
            <form onSubmit={aoSalvar}>
                <h2>Cadastro de cards de produtos</h2>
                <CampoTexto
                    label="Nome"
                    placeholder="Digite o nome do produto"
                    required={true}
                    valor={nome}
                    aoAlterado={valor => setNome(valor)}
                />
                <CampoTexto
                    label="Código"
                    placeholder="Digite o código do produto"
                    required={true}
                    valor={codigo}
                    aoAlterado={valor => setCodigo(valor)}
                />
                <CampoTexto
                    label="Imagem"
                    placeholder="Coloque a URL da imagem"
                    valor={imagem}
                    aoAlterado={valor => setImagem(valor)}
                />
                <ListaSuspensa
                    label="Marca"
                    required={true}
                    itens={props.marcas}
                    valor={marca}
                    aoAlterado={valor => setMarca(valor)}
                />
                <Botao
                    texto="Cadastrar Card"
                />
            </form>
        </section>
    )
}

export default Formulario