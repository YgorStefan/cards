// src/componentes/Header/index.js
import './Header.css'

const Header = ({ onAbrirDrawerProduto, onAbrirDrawerMarca }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <div className="header__logo-icon">C</div>
        <span className="header__logo-text">CDP Catálogo</span>
      </div>
      <div className="header__acoes">
        <button
          className="header__btn-marca"
          type="button"
          onClick={onAbrirDrawerMarca}
        >
          + Marca
        </button>
        <button
          className="header__btn-produto"
          type="button"
          onClick={onAbrirDrawerProduto}
        >
          + Produto
        </button>
      </div>
    </header>
  )
}

export default Header
