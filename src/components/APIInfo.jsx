import React, { Fragment } from 'react';
// ui
import {
  Container,
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
} from 'reactstrap';

export default ({info}) => (
  <Container>
    <Row>
      <Col>
        <Card>
          <CardBody>
            <CardTitle>API Information</CardTitle>
            <dl className="App-intro">
              {Object.keys(info).map((term, k) => (
                <Fragment key={k}>
                  <dt>{term}</dt>
                  <dd>{info[term]}</dd>
                </Fragment>
              ))}
            </dl>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
)