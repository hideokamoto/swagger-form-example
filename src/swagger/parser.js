const SwaggerParser = require('swagger-parser')
const filePath = __dirname + "/sample.yml"

const genReactRouterPath = (basePath, path) => {
  if (!/\{/.test(path)) return `${basePath}${path}`
  const newpath = path.replace(/\{/, '{:')
  return `${basePath}${newpath}`
}

SwaggerParser.dereference(filePath)
  .then((data) => {
    console.log(`Swagger: ${data.swagger}`)
    console.log(`Info:`)
    Object.keys(data.info).forEach(key => console.log(`${data.info[key]}\n`))
    const { basePath, paths } = data
    Object.keys(paths).forEach(key => {
      const routePath = genReactRouterPath(basePath, key)
      const routes = paths[key]
      console.log(`React Router Path: ${routePath}`)
      Object.keys(routes).forEach(method => {
        console.log(`API Path: ${method.toUpperCase()}${basePath}${key}`)
        const item = routes[method]
        const { parameters } = item
        if (!parameters || parameters.length === 0) return;
        console.log('Parameters')
        parameters.forEach(param => {
          Object.keys(param).forEach(j => {
            const data = param[j]
            if (j === 'name') {
              console.log(`  ${j}: ${data}`)
            } else if (j === 'schema') {
              console.log('    schema:')
              const props = data.properties
              Object.keys(props).forEach(k => {
                const schema = props[k]
                console.log(`      ${k}: ${schema.type}`)
              })
            } else {
              console.log(`    ${j}: ${data}`)
            }
          })
        })
        console.log('\n')
      })
      console.log('\n')
    })
  });