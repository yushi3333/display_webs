
import './App.css';
import Header from '../src/components/header/Header'
import Home from '../src/components/home/Home'
import Apple from '../src/components/apple/Apple'
import Dell from '../src/components/dell/Dell'
import Asus from '../src/components/asus/Asus.js'
import Register from './components/register/Register.js'
import Layout from './components/Layout'
import Login from './components/login/Login.js'
import Details from './components/details/Details.js'
import AdminRoute from './components/admin/adminRoute.js'
import DashBoard from './components/admin/AdminDashBoard.js'
import UserBoard from './components/admin/UserBoard.js';
import SearchProducts from './components/card/CardGroup.js'
import Fastlane from './components/pay/Fastline.js';
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
  const [asus, setAsus] = useState([])
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([])
  const [totalAmount, setTotalAmount] = useState(0);

  
  const [addToCart, setAddToCart] = useState({})
  const cart = useSelector((state) => state.cart.items || []);
  const dispatch = useDispatch();
  
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role')
  const ClientId = "AaRnJIfSN73BkZrRalwS3arrH_ciulT-CiPKExR4eixLhVc983UY3eEAHkkvFc7Xx1TeO98f_sXvDdEw"


  const getRecommends = async() =>{
    try{
      const appleResponse = await axios.get('http://127.0.0.1:3002/api/products/Apple');

      const dellResponse = await axios.get('http://127.0.0.1:3002/api/products/Dell');

      const asusResponse = await axios.get('http://127.0.0.1:3002/api/products/Asus');
      const combineRecommends = [appleResponse.data[0], dellResponse.data[0], asusResponse.data[0]]
      const combine = [...appleResponse.data, ...dellResponse.data, ...asusResponse.data]
      setRecommends(combineRecommends)
      setProducts(combine)
      setFilteredProducts(combine)

    }catch(err){
      console.log(err)
    }
  }

  const getDellProducts = async() =>{
    try{
      //backend api endpoint
      const response = await axios.get("http://127.0.0.1:3002/api/products/Dell");
      setDells(response.data)
    }catch(err){
      console.log(err)
    }
  }
  const getAsusProducts = async() =>{
    try{
      const response = await axios.get("http://127.0.0.1:3002/api/products/Asus");
      setAsus(response.data)
    }catch(err){
      console.log(err)
    }
  }

  const getAppleProducts = async()=>{
    try{
      const response = await axios.get("http://127.0.0.1:3002/api/products/Apple");
      
      setApples(response.data)
      
    }catch(err){
      console.log(err)

    }
  }

  useEffect(() => {
    getAppleProducts();
    getDellProducts();
    getRecommends();
    getAsusProducts();
    
  }, [])
  const handleSearch = (searchTerm)=>{
    const filtered= products.filter((product)=> 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredProducts(filtered)

  }

  const handleAddCart = (product)=>{
    // Check if the product belongs to apples or dells
    const isApple = apples.some((p) => p._id === product._id);
    const isDell = dells.some((p) => p._id === product._id);
    const isAsus = asus.some((p) => p._id === product._id );
    if ((isApple || isDell || isAsus) && product.stock > 0) {
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

      }else if (isAsus){
        setAsus((prevProducts)=> 
          prevProducts.map((p)=>
            p._id === product._id ? {...p, stock: p.stock-1} : p
            
          )
        )
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
  const handleTransactionSuccess = (details) => {
    console.log('Transaction Successful:', details);
    alert(`Transaction completed by ${details.payer.name.given_name}`);
  };
  
  return (
    <div>
      
      <Header username={username} role={role} onSearch={handleSearch}/>
      <Routes>

      <Route path="/" element={<Layout />}>
        {/* Use `index` for the default child route */}
        <Route index element={<Home recommends={recommends}/>} />
      </Route>
        <Route path="/Apple" element={<Apple apples={apples} addToCart={handleAddCart}/>}></Route>
        <Route path="/Dell" element={<Dell dells={dells} addToCart={handleAddCart}/>}></Route>
        <Route path="/Cart" element={<CartItem  products={products} setProducts={setProducts} setTotalAmount={setTotalAmount}/>}></Route>
        <Route path="/Asus" element={<Asus asus={asus} addToCart={handleAddCart} />}></Route>
        
        <Route path="/Register" element={<Register/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/Details" element={<Details product={products}/>}></Route>
        <Route path="/Search" element = {<SearchProducts products={filteredProducts} addToCart={handleAddCart}/>}></Route>
        <Route path="/Payment" element={<Fastlane clientId={ClientId} onTransactionSuccess={handleTransactionSuccess} totalAmount={totalAmount}/>}></Route>

        <Route path="/admin/DashBoard" element={
          <AdminRoute>
            <DashBoard/>
          </AdminRoute>

        }/>
        <Route path="/admin/UserBoard" element={
          <AdminRoute>
            <UserBoard/>
          </AdminRoute>
          
        }/>
        
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
