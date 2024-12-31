import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
const ProductForm = ({ product, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    overview: '',
    price: '',
    stock: '',
    image: [],
    poster:'',
    category:'',
    specification:{
      condition:'',
      screenSize:'',
      display:'',
      processorType:'',
      cores:'',
      driveCapacity:'',
      ramSize:''

    }
  });

  // When the product prop changes, populate the form
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        overview: product.overview,
        price: product.price,
        stock: product.stock,
        image:product.image,
        category: product.category,
        poster: product.poster,
        specification: product.specification || {
          condition: "",
          screenSize: "",
          display: "",
          processorType: "",
          cores: "",
          driveCapacity: "",
          ramSize: "",
        },


        
      });
    } else {
      setFormData({
        name: '',
        category: '',
        description: '',
        price: '',
        stock: '',
        image: [],
        poster: '',
        specification:  {
          condition: "",
          screenSize: "",
          display: "",
          processorType: "",
          cores: "",
          driveCapacity: "",
          ramSize: "",
        },
       
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name==="image"){
      setFormData((prev)=>({
        ...prev,
        [name]:value.split(',').map((url)=>url.trim()),
      }))
    }
    else if (name.startsWith("specification.")) {
      const specKey = name.split(".")[1]; // Extract the specific key for specification
      setFormData((prev) => ({
        ...prev,
        specification: {
          ...prev.specification,
          [specKey]: value, // Update only the specific key in the specification object
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value, // Update other form fields
      }));
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category) {
      alert('Please select a category');
      return;
    }
    onSubmit({
      ...formData,
      price:parseFloat(formData.price),
      stock:parseInt(formData.stock),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Name
        </InputGroup.Text>
        <Form.Control
          name="name"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default" type="string" value={formData.name} onChange={handleChange} placeholder='Product Name' required
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Price
        </InputGroup.Text>
        <Form.Control
          name="price"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default" type="number" value={formData.price} onChange={handleChange} placeholder='Price' required
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Stock
        </InputGroup.Text>
        <Form.Control
          name="stock"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default" type="number" value={formData.stock} onChange={handleChange} placeholder='Stock' required
        />
      </InputGroup>
      
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Image Url
        </InputGroup.Text>
        <Form.Control
          name="image"
          as='textarea'
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default" type="text" value={formData.image.join(',')} onChange={handleChange} placeholder='Enter comma-separated image URLs' required
        />
      </InputGroup>

      
      <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">
          Poster Url
        </InputGroup.Text>
        <Form.Control
          name="poster"
          as='textarea'
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default" type="text" value={formData.poster} onChange={handleChange} placeholder='Poster url' required
        />
      </InputGroup>


      
      

      <InputGroup>
        <InputGroup.Text>Overview</InputGroup.Text>
        <Form.Control name="overview" as="textarea" aria-label="Overview" value={formData.overview} onChange={handleChange}/>
      </InputGroup>
      <div>
        <label>Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          <option value="Apple">Apple</option>
          <option value="Dell">Dell</option>
          <option value="Asus">Asus</option>
        </select>
      </div>

      <h5>Specifications</h5>
      <InputGroup className="mb-3">
        <InputGroup.Text>Condition</InputGroup.Text>
        <Form.Control
          name="specification.condition"
          type="text"
          value={formData.specification.condition || ''}
          onChange={handleChange}
          placeholder="Condition (e.g., Brand New)"
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text>Screen Size</InputGroup.Text>
        <Form.Control
          name="specification.screenSize"
          type="text"
          value={formData.specification.screenSize || ''}
          onChange={handleChange}
          placeholder="the screen size"
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text>Processor Cores</InputGroup.Text>
        <Form.Control
          name="specification.cores"
          type="text"
          value={formData.specification.cores || ''}
          onChange={handleChange}
          placeholder="the number of cores"
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text>Processor Types</InputGroup.Text>
        <Form.Control
          name="specification.processorType"
          type="text"
          value={formData.specification.processorType || ''}
          onChange={handleChange}
          placeholder="the type of processor"
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text>Drive Capacity</InputGroup.Text>
        <Form.Control
          name="specification.driveCapacity"
          type="text"
          value={formData.specification.driveCapacity || ''}
          onChange={handleChange}
          placeholder="Solid-State Drive Capacity"
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text>RAM Size</InputGroup.Text>
        <Form.Control
          name="specification.ramSize"
          type="text"
          value={formData.specification.ramSize || ''}
          onChange={handleChange}
          placeholder="RAM size"
        />
      </InputGroup>


      


      

      <button type="submit">{product ? 'Update Product' : 'Add Product'}</button>
    </form>
  );
};

export default ProductForm;
