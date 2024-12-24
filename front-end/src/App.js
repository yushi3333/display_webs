
import './App.css';
import Header from '../src/components/header/Header'
import Home from '../src/components/home/Home'
import Apple from '../src/components/apple/Apple'
import Dell from '../src/components/dell/Dell'

import Layout from './components/Layout'
import {Routes, Route, RouterProviderProps} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { addItem, updateQuantity, clearCart } from './components/cart/CartSlice';
import CartItem from './components/cart/CartItem';
import {Provider} from 'react-redux'
import store from "./components/store.js"
import axios from 'axios'

function AppContent() {
  const [recommends, setRecommends] = useState([])
  const [apples, setApples] = useState([])
  const [dells, setDells] = useState([])
  const [products, setProducts] = useState([]);

  
  const [addToCart, setAddToCart] = useState({})
  const [showCart, setShowCart] = useState(false);
  const cart = useSelector((state) => state.cart.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const getRecommends = async() =>{
    try{
      const appleResponse = await axios.get('http://localhost:3002/api/products/Apple');
      const dellResponse = await axios.get('http://localhost:3002/api/products/Dell');
      const combine = [...appleResponse.data, ...dellResponse.data]
      setRecommends(combine)


    }catch(err){
      console.log(err)
    }
  }

  const getDellProducts = async() =>{
    try{
      const response = await axios.get("http://localhost:3002/api/products/Dell");
      
      setDells(response.data)

    }catch(err){
      console.log(err)
    }
  }

  const getAppleProducts = async()=>{
    try{
      const response = await axios.get("http://localhost:3002/api/products/Apple");
      
      setApples(response.data)
      
    }catch(err){
      console.log(err)

    }
  }

  

  useEffect(() => {
    getAppleProducts();
    getDellProducts();
    getRecommends();
    
  }, [])

  const handleAddCart = (product)=>{
    // Check if the product belongs to apples or dells
    const isApple = apples.some((p) => p._id === product._id);
    const isDell = dells.some((p) => p._id === product._id);
    if ((isApple || isDell) && product.stock > 0) {
      const existingCartItem = cart.find((item)=>item._id === product._id);
      if (existingCartItem){
        dispatch(updateQuantity({_id:product._id, name:product.name, quantity: existingCartItem.quantity + 1}));
        console.log("add existing item to the cart")
      
      }else{
        console.log("add new item to the cart")
        dispatch(addItem({
          _id: product._id,
          name: product.name,
          quantity: 1,
          image: product.image[0],
          price: product.price,
          stock:product.stock,

        }));
      }
      if (isApple){
        // Update the local Products state to decrease the stock by 1
        setApples((prevProducts) =>
            prevProducts.map((p) =>
                p._id === product._id ? { ...p, stock: p.stock - 1 } : p
            )
        );
        
      }else if (isDell){
        setDells((prevProducts) =>
            prevProducts.map((p) =>
                p._id === product._id ? { ...p, stock: p.stock - 1 } : p
            )
        );

      }
      // Update the `addToCart` state
      setAddToCart((prevState) => ({
        ...prevState,
        [product.name]: true,
      }));
    } else {
        console.log("Out of stock");

    }
      
  }
  
  return (
    <div>
      <Header/>
      <Routes>
      <Route path="/" element={<Layout />}>
        {/* Use `index` for the default child route */}
        <Route index element={<Home recommends={recommends} />} />
      </Route>
        <Route path="/Apple" element={<Apple apples={apples} addToCart={handleAddCart}/>}></Route>
        <Route path="/Dell" element={<Dell dells={dells} addToCart={handleAddCart}/>}></Route>
        <Route path="/Cart" element={<CartItem onContinueShopping={()=>navigate("/")} products={[...apples,...dells]} setProducts={setProducts}/>}></Route>
      </Routes>  
    </div>
  );
}

function App(){
  return(
    <Provider store={store}>
      <AppContent/>
    </Provider>
  )
  
}

export default App;
