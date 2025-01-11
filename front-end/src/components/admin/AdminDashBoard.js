import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from './productFrom';
import './dashBoard.css'; 
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from './sideBar/sideBar';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);


  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');




  // Fetch all products from the API
  const fetchProducts = async () => {
    try {
      const appleResponse = await axios.get('https://yugopro.com/api/products/Apple');
      const dellResponse = await axios.get("https://yugopro.com/api/products/Dell");
      const asusResponse = await axios.get("https://yugopro.com/api/products/Asus")
    
      const combine = [...appleResponse.data, ...dellResponse.data, ...asusResponse.data]
 
      setProducts(combine);
      setFilteredProducts(combine);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form submission (create or update a product)
  const handleFormSubmit = async (product) => {
    if (!product.category) {
      console.error('Category is required but not provided');
      alert('Please select a category');
      return;
    }
    if (editingProduct) {
      // Update product
      try {
        console.log('Updating product with ID:', editingProduct._id);
        await axios.put(`https://yugopro.com/api/products/${product.category}/${editingProduct._id}`,{
          headers: { Authorization: `Bearer ${token}` }
        }, product);
        window.alert('Product updated successfully!');
        window.location.reload();  // Force the page to reload to reflect the changes
        
      } catch (error) {
        console.error('Failed to update product', error);
      }
    } else {
      // Create new product
      try {
        const response = await axios.post(`https://yugopro.com/api/products/${product.category}`,{
          headers: { Authorization: `Bearer ${token}` }
        }, product);

        setProducts([...products, response.data]);
        window.alert('New product has been added!')
        window.location.reload(); 
      } catch (error) {
        console.error('Failed to create product', error);
      }
    }
  };

  //handleSortbyprice
  const handleSortByPrice = () =>{
    const sortedProducts= [...filteredProducts].sort((a,b) =>{
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    })
    setFilteredProducts(sortedProducts);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');//toggle order
  }
  //handle search
  const handleSearch = (event) =>{
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = products.filter(product=>
      product.name.toLowerCase().includes(query)
    );

    setFilteredProducts(filtered);

  }

  // Handle deleting a product
  const handleDelete = async (singleProduct) => {
    try {
      await axios.delete(`https://yugopro.com/api/products/${singleProduct.category}/${singleProduct._id}`,{
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(products.filter((product) => product._id !== singleProduct._id));
      fetchProducts(); 
      window.alert('The product has been deleted!')
    } catch (error) {
      console.error('Failed to delete product', error);
    }
  };

  // Handle edit button click
  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  return (
    
    <div className="dashboard" style={{width:"100vw"}}>
      <Sidebar /> {/* Sidebar Component */}
      
      <div id = "product-form"className="product-form" style={{width:"100vw", justifyContent:"center", alignContent:"center"}}>
      <h1>Admin Dashboard</h1>
        <ProductForm
          key={editingProduct ? editingProduct._id : 'new'}
          product={editingProduct}
          onSubmit={handleFormSubmit}
        />
      </div>

      <div className="product-list" id ="product-list" style={{width:"100%", justifyContent:"center", alignContent:"center"}}>
        <h2>Product List</h2>
            <Row>
              <Col >
               {/* search bar */}
              <input 
                type='text'
                placeholder='search by product name'
                value={searchQuery}
                onChange={handleSearch}
                style={{width: '100%'}}
                />

              </Col>
            
           
            </Row>
         
        <Table striped bordered hover variant="dark">         
          <thead>
            <tr>
              <th>Name</th>

              <th onClick={handleSortByPrice} style={{cursor: 'pointer'}}>Price {sortOrder === 'asc' ? '^' : 'v'}</th>
              <th>Stock</th>
              
              
              <th>Action</th>
            
            </tr>
           
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
              
                
                <td>
                  <button style={{width:'100%'}}onClick={() => handleEdit(product)}>Edit</button>
                  <button style={{width:'100%'}}onClick={() => handleDelete(product)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div style={{marginBottom:'10%'}}>

      </div>
    </div>
    
  );
};

export default Dashboard;
