import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-material-ui-carousel';

const dellCardGroup = ({products, addToCart})=> {
  return (
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
              <Card.Title  style={{fontSize:'20px'}}>{item.name}</Card.Title>
              <Card.Text>
                ${item.price}
              </Card.Text>
              <Button variant="primary" onClick={()=>addToCart(item)}>Add to Cart</Button>
              <Button variant="dark"  >Details</Button>

            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default dellCardGroup;