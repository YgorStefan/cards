import {useState} from "react"
import Banner from "./componentes/Banner"
import Formulario from "./componentes/Formulario"
import Marca from "./componentes/Marca"

function App() {

    const marcas = [
        {
            nome: 'Jetmax',
            corPrimaria: '#D9F7E9',
            corSecundaria: '#57C278'
        },
        {
            nome: 'Kajima',
            corPrimaria: '#E8F8FF',
            corSecundaria: '#82CFFA'
        },
        {
            nome: 'KWS',
            corPrimaria: '#F0F8E2',
            corSecundaria: '#A6D157'
        },
        {
            nome: 'Kawashima',
            corPrimaria: '#FDE7E8',
            corSecundaria: '#E06B69'
        },
        {
            nome: 'Nakashi',
            corPrimaria: '#FFF5D9',
            corSecundaria: '#FFBA05'
        },
        {
            nome: 'Outros',
            corPrimaria: '#FFEEDF',
            corSecundaria: '#FF8A29'
        },
    ]

    const [produtos, setProdutos] = useState([])

    const aoNovoProdutoAdicionado = (produto) => {
        console.log(produto)
        setProdutos([...produtos, produto])
    }

    return (
        <div className="App">
            <Banner />
            <Formulario marcas={marcas.map(marca => marca.nome)} aoProdutoCadastrado={produto => aoNovoProdutoAdicionado(produto)} />

            {marcas.map(marca => <Marca
                key={marca.nome}
                nome={marca.nome}
                corPrimaria={marca.corPrimaria}
                corSecundaria={marca.corSecundaria}
                produtos={produtos.filter(produto => produto.marca === marca.nome)}
            />)}

        </div>
    )
}

export default App