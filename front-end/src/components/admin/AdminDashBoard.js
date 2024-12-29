import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from './productFrom';
import './dashBoard.css'; 
import Table from 'react-bootstrap/Table';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch all products from the API
  const fetchProducts = async () => {
    try {
      const appleResponse = await axios.get('http://localhost:3002/api/products/Apple');
      const dellResponse = await axios.get("http://localhost:3002/api/products/Dell");
      const combine = [...appleResponse.data, ...dellResponse.data]
 
      setProducts(combine);
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
        await axios.put(`http://localhost:3002/api/products/${product.category}/${editingProduct._id}`, product);
        console.log('Product updated successfully!');
        window.location.reload();  // Force the page to reload to reflect the changes
        
      } catch (error) {
        console.error('Failed to update product', error);
      }
    } else {
      // Create new product
      try {
        const response = await axios.post(`http://localhost:3002/api/products/${product.category}`, product);

        setProducts([...products, response.data]);
        
        window.location.reload(); 
      } catch (error) {
        console.error('Failed to create product', error);
      }
    }
  };

  // Handle deleting a product
  const handleDelete = async (singleProduct) => {
    try {
      await axios.delete(`http://localhost:3002/api/products/${singleProduct.category}/${singleProduct._id}`);
      setProducts(products.filter((product) => product._id !== singleProduct._id));
      fetchProducts(); 
    } catch (error) {
      console.error('Failed to delete product', error);
    }
  };

  // Handle edit button click
  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="product-form">
        <ProductForm
          key={editingProduct ? editingProduct._id : 'new'}
          product={editingProduct}
          onSubmit={handleFormSubmit}
        />
      </div>

      <div className="product-list">
        <h2>Product List</h2>
        <Table striped bordered hover variant="dark"> 
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Overview</th>
              <th>Category</th>
              <th>Action</th>
            
            </tr>
           
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>{product.overview}</td>
                <td>{product.category}</td>
                
                <td>
                  <button onClick={() => handleEdit(product)}>Edit</button>
                  <button onClick={() => handleDelete(product)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
