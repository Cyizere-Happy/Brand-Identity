import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Cart = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="cart-sidebar"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          <div className="cart-header">
            <h3>YOUR CART</h3>
            <button onClick={onClose}><X size={24} /></button>
          </div>

          <div className="cart-items">
            <div className="cart-item">
              <div className="item-img">🏀</div>
              <div className="item-info">
                <h4>VORTEX PRO</h4>
                <p>COLOR: #F57C00</p>
              </div>
              <div className="item-price">$120.00</div>
            </div>
            <div className="cart-item">
              <div className="item-img">🏀</div>
              <div className="item-info">
                <h4>SPAING ELITE</h4>
                <p>COLOR: #39FF14</p>
              </div>
              <div className="item-price">$145.00</div>
            </div>
          </div>

          <div className="cart-footer">
            <div className="subtotal">
              <span>SUBTOTAL</span>
              <span>$265.00</span>
            </div>
            <button className="checkout-btn">CHECKOUT</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cart;
