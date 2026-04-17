import './Header.css'

const Header = ({ onAbrirDrawerProduto, onAbrirDrawerMarca }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <div className="header__logo-icon">
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </div>
        <span className="header__logo-text">Catálogo</span>
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
