import React from 'react';
// ui
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
} from 'reactstrap';


export default ({path, routes}) => {
  const route = routes[path]
  return (
    <Container>
      <h2>Current page</h2>
      <h3>{path}</h3>
      <Row>
        {Object.keys(route).map((method, key) => {
          const item = route[method]
          console.log(item)
          return (
            <Col key={key}>
              <Card>
                <CardBody>
                  <CardTitle>Method: {method}</CardTitle>
                  <p>{item.description}</p>
                </CardBody>
              </Card>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}