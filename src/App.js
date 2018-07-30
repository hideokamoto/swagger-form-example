import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
const file = require('./swagger/sample.yml')

const SwaggerParser = require('swagger-parser')

const genReactRouterPath = (basePath, path) => {
  if (!/\{/.test(path)) return `${basePath}${path}`
  return `${basePath}${path}`.replace(/\{/g, ':').replace(/\}/g, '')
}

const DynamicComponent = withRouter(({path, routes}) => {
  const route = routes[path]
  return (
    <div>
      <h3>{path}</h3>
      {Object.keys(route).map((method, key) => {
        const item = route[method]
        console.log(item)
        return (
          <div key={key}>
            <h4>Method: {method}</h4>
            <p>{item.description}</p>
          </div>
        )
      })}
    </div>
  )
})

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
    const { info, navigationPaths, routerPaths } = this.state;
    console.log(this.state.routes)
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <dl className="App-intro">
            {Object.keys(info).map((term, k) => (
              <Fragment key={k}>
                <dt>{term}</dt>
                <dd>{info[term]}</dd>
              </Fragment>
            ))}
          </dl>
          <div className="router-list">
            <h2>Current page</h2>
            <Routes {...this.state} />
            <h2>Links</h2>
            <ul>
              {navigationPaths.map((path, key) => {
                return <li key={key}><Link to={path}>{path}</Link></li>
              })}
            </ul>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
