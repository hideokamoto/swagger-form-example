import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// ui
import { Row, Col } from 'reactstrap';
import './App.css';

// component
import Hello from './components/Hello';
import APIInfo from './components/APIInfo';
import Navigations from './components/Navigations';
import DynamicComponent from './components/DynamicContent';

const file = require('./swagger/sample.yml')

const SwaggerParser = require('swagger-parser')


const genReactRouterPath = (basePath, path) => {
  if (!/\{/.test(path)) return `${basePath}${path}`
  return `${basePath}${path}`.replace(/\{/g, ':').replace(/\}/g, '')
}

const Routes = ({routerPaths, routes}) => {
  return (
    <Switch>
      {routerPaths.reverse().map((path, key) => (
        <Route
          key={key}
          path={path}
          component={() => <DynamicComponent path={path} routes={routes} />}
        />
      ))}
      <Route path="/" exact component={() => <div>Home</div>}/>
    </Switch>
  )
}


class App extends Component {
  state = {
    routerPaths: [],
    navigationPaths: [],
    routes: {},
    info: {}
  }
  componentDidMount = async () => {
    const data = await SwaggerParser.dereference(file)
    const { basePath, paths, info } = data
    const routerPaths = []
    const navigationPaths = []
    const routes = {}
    Object.keys(paths).forEach(key => {
      const pathKey = `${basePath}${key}`.replace(/\{/g, '').replace(/\}/g, '')
      const routePath = genReactRouterPath(basePath, key)
      routes[routePath] = paths[key]
      navigationPaths.push(pathKey)
      routerPaths.push(routePath)
    })
    this.setState({routerPaths, navigationPaths, routes, info})
    return
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Hello />
          <div className="router-list">
            <Row>
              <Col md="3">
                <h2>Links</h2>
                <Navigations  {...this.state} />
              </Col>
              <Col md="9">
                <Routes {...this.state} />
                <br />
                <APIInfo {...this.state} />
              </Col>
            </Row>
            <br />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
