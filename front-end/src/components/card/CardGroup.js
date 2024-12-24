import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const CardGroup = ({apples, addToCart})=> {
  
  // console.log("apple received: ",apples)

  return (
    <Row xs={1} md={4} className="g-2">
      {apples?.map((item, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Img variant="top" src={item.image?.[0]} />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>
                ${item.price}
              </Card.Text>
              <Button variant="primary" onClick={()=>addToCart(item)} >Add to Cart</Button>
              <Button variant="dark" >Details</Button>

            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default CardGroup;