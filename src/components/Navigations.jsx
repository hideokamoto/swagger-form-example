import React from 'react';
import { Link } from 'react-router-dom';

const Navigations = ({navigationPaths}) => (
  <ul>
    {navigationPaths.map((path, key) => {
      return <li key={key}><Link to={path}>{path}</Link></li>
    })}
  </ul>
)

export default Navigations;