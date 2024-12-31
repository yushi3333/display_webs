import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Details from '../details/Details'
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import './CardGroup.css'
import Carousel from 'react-material-ui-carousel';
const CardGroup = ({products, addToCart})=> {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  

  const handleOpenDetails = (product)=>{
    setSelectedProduct(product);
    setShowModal(true);
  }
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };
  
 
  return (
    <>
    <Row xs={1} md={4} className="g-2">
      {products?.map((item, idx) => (
        <Col key={idx}>
          <Card style={{ maxHeight: '500px', objectFit: 'cover' }}>
          <Carousel>
                {item.image?.map((imgSrc, index) => (
                  <Card.Img key ={index}
                  variant="top" src={imgSrc} />
                 
                ))}
              </Carousel>
           
            <Card.Body>
              <Card.Title style={{fontSize:'20px'}}>{item.name}</Card.Title>
              <Card.Text>
                ${item.price}
              </Card.Text>
              <Button variant="primary" onClick={()=>addToCart(item)} >Add to Cart</Button>
              <Button variant="dark" onClick={()=>handleOpenDetails(item)} >Details</Button>

            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    {/* Modal */}
    <Modal show={showModal} onHide={handleCloseModal} fullscreen={true}>
      <Modal.Header closeButton>
        <Modal.Title>Product Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedProduct && (
          <Details product={selectedProduct} />
        )}
      </Modal.Body>
    </Modal>
    </>
   
        
  );
}

export default CardGroup;