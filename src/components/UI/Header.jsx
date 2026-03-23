import { Search, User, ShoppingBag } from 'lucide-react';

const Header = ({ onCartClick }) => {
  return (
    <header className="header">
      <div className="logo-container">
        <div className="logo-circle">
           <div className="logo-ball-icon"></div>
        </div>
        <div className="logo-text">
          <span>SLAM</span>
          <span>DUNK</span>
        </div>
      </div>

      <nav className="main-nav">
        <a href="#" className="active">Products</a>
        <a href="#">Customize</a>
        <a href="#">Contacts</a>
      </nav>

      <div className="header-actions">
        <button className="action-btn"><Search size={22} /></button>
        <button className="action-btn"><User size={22} /></button>
        <button className="action-btn cart-btn" onClick={onCartClick}>
          <ShoppingBag size={22} />
          <span className="cart-count">2</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
