import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const file = require('./swagger/sample.yml')

const SwaggerParser = require('swagger-parser')

const genReactRouterPath = (basePath, path) => {
  if (!/\{/.test(path)) return `${basePath}${path}`
  const newPath = path.replace(/\{/g, '{:')
  const base = path.replace(/\{/g, '{:')
  console.log(base)
  return `${base}${newPath}`
}

class App extends Component {
  state = {
    routerPaths: [],
    navigationPaths: []
  }
  componentDidMount = async () => {
    const data = await SwaggerParser.dereference(file)
    Object.keys(data.info).forEach(key => console.log(`${data.info[key]}\n`))
    const { basePath, paths } = data
    const routerPaths = []
    const navigationPaths = []

    Object.keys(paths).forEach(key => {
      const routePath = genReactRouterPath(basePath, key)
      const routes = paths[key]
      navigationPaths.push(`${basePath}${key}`.replace(/\{/g, '').replace(/\}/g, ''))
      routerPaths.push(routePath)
    })
    this.setState({routerPaths, navigationPaths})
    return
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="router-list">
          <h2>Links</h2>
          <ul>
            {this.state.navigationPaths.map((path, key) => {
              return <li key={key}>{path}</li>
            })}
          </ul>

          <h2>Router</h2>
          <ul>
            {this.state.routerPaths.map((path, key) => {
              return <li key={key}>{path}</li>
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
