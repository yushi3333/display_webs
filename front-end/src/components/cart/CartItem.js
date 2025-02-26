import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../cart/CartSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './CartItem.css';

const CartItem = ({ products, setProducts, setTotalAmount }) => {
  const cart = useSelector((state) => state.cart.items);
  console.log(cart)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // Determine the previous page from location.state
  const previousPage = location.state?.from || '/'; 


  const DELIVERY_COST = 50; 
  const TAX_RATE = 0.08; 

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    const totalCartAmount = cart.reduce((totalCost, item) => totalCost + (item.price||0) * (item.quantity|| 0).toFixed(2), 0);
    const taxAmount = totalCartAmount * TAX_RATE;
    return totalCartAmount + taxAmount + DELIVERY_COST;
  };
  useEffect(()=>{
    if (setTotalAmount){
      const total = calculateTotalAmount();
      setTotalAmount(total)
    }
  }, [setTotalAmount])

  const handleContinueShopping = (e) => {
      navigate(previousPage); 
  };

  const handleIncrement = (item) => {
   
    if (item.quantity < item.stock) {
      // Increase quantity in cart
      dispatch(updateQuantity({ _id: item._id, name: item.name, quantity: item.quantity + 1 }));

      // Decrease stock in product list
      setProducts((prevProducts) =>
          prevProducts.map((product) =>
              product._id === item._id ? { ...product, stock: product.stock - 1 } : product
          )
      );
    }
  
   
   
  };

  const handleDecrement = (item) => {
    if (!item._id) {
      console.error('Error: item._id is undefined', item);
      return;
    }
    
    if (item.quantity > 1) {
      // Decrease quantity in cart
      dispatch(updateQuantity({_id: item._id, name: item.name, quantity: item.quantity - 1 }));

      // Increase stock in product list
    
      setProducts((prevProducts) => {
        if (Array.isArray(prevProducts)) {
            return prevProducts.map((product) =>
                product._id === item._id ? { ...product, stock: product.stock + 1 } : product
            );
        } else {
            console.error('prevProducts is not an array', prevProducts);
            return prevProducts;
        }
    });
             
    }
  };

  const handleRemove = (item) => {
    // Increase stock based on removed quantity
    if (!item._id) {
      console.error('Error: item._id is undefined', item);
      return;
    }
    setProducts((prevProducts) =>{
        const updatedProducts = prevProducts.map((product) =>
        product._id === item._id ? { ...product, stock: product.stock + item.quantity } : product
      )
      console.log("Stock Restored:", updatedProducts);
      return updatedProducts;
    });

    dispatch(removeItem(item._id));
    window.location.reload();
  };

  const handleCheckoutShopping = () => {

    navigate('/Payment');
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return parseFloat(item.price || 0) * (item.quantity || 0).toFixed(2);
  };


  return (
    <Container>
      {/* <Row>
      <h2 style={{ color: 'black', marginTop:'5%', textAlign:'center'}}>Total Cart Amount: ${calculateTotalAmount().toFixed(2)}</h2>
        
      </Row> */}
      <Row>
        <Col>
          <div className="cartItems">
          {cart.filter((item)=> item && item._id && item.name)
          .map((item) => (
            <div className="cart-item" key={item._id}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">${item.price}</div>
                <div className="cart-item-quantity">
                  <button
                    className="cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button
                    className="cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                    disabled={item.quantity >= item.stock}
                    
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">Total: ${calculateTotalCost(item).toFixed(2)}</div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                  Delete
                </button>
                </div>
            </div>
          ))}
        </div>

        </Col>
        <Col>
        <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount"></div>
        <div className="summary-container" style={{ marginTop: '20px', color: 'black' }}>
          <h3>Summary</h3>
          <p>Subtotal: ${cart.reduce((total, item) => total + (item.price||0) * (item.quantity||0), 0).toFixed(2)}</p>
          <p>Tax (13%): ${(cart.reduce((total, item) => total + (item.price||0) * (item.quantity||0), 0) * TAX_RATE).toFixed(2)}</p>
          <p>Delivery Cost: ${DELIVERY_COST.toFixed(2)}</p>
          <p><strong>Total Amount: ${calculateTotalAmount().toFixed(2)}</strong></p>
        </div>
        <div className="continue_shopping_btn">
        <button className="get-started-button2" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className={
          cart.length <= 0 ? 'get-started-button1' : "get-started-button2"
        }
         onClick={handleCheckoutShopping} 
         disabled={cart.length===0}>
          Checkout
        </button>
      </div>


        </Col>
      </Row>

    
    </Container>
  );
};

export default CartItem;
