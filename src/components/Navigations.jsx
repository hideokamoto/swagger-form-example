import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';

const Navigations = ({navigationPaths}) => (
  <ListGroup style={{overflow: 'scroll', padding: '20px'}}>
    {navigationPaths.map((path, key) => {
      return <ListGroupItem key={key}><Link to={path}>{path}</Link></ListGroupItem>
    })}
  </ListGroup>
)

export default Navigations;