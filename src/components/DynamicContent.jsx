import React from 'react';
// ui
import {
  Container,
  Row,
} from 'reactstrap';

// component
import DynamicForm from './DynamicForm';

export default ({path, routes}) => {
  const route = routes[path]
  return (
    <Container>
      <h2>Current page</h2>
      <h3>{path}</h3>
      <Row>
        {Object.keys(route).map((method, key) => (
          <DynamicForm
            key={key}
            method={method}
            item={route[method]}
          />
        ))}
      </Row>
    </Container>
  )
}