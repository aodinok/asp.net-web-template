// server.js
const jsonServer = require('json-server')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

// Custom routes
server.post('/token', function (req, res) {
  if (req.method === 'POST') {
    if (req.body.username === 'adminuser' && req.body.password === 'password') {
      res.send({
        'access_token': 'AQAAANCMnd8BFdERjHoAwE_Cl-sBAAAAU_WPfqsIJ0yMravjxoG2LwAAAAACAAAAAAADZgAAwAAAABAAAADwT8-O5zSLJokXojIUH6QbAAAAAASAAACgAAAAEAAAAGC7IpNyxWgZVCmfble2jKuAAAAAIwWtNQMU46tQKbfYKGGhuSt1DMPc9DL5yrLD4D02tfYo19CwTbYsjeFlsgc2jx6VOb9ktBiYJRGJicBhaLgBWKyM6E1eM581J1yeh-XgF9vO2huN5X6gtFkxX1ffWMa32cgqwDY5WF-r-jq7rUEG_eej3vAbPfSiwXQm737QqrcUAAAAxuZPONnRH5ClmwwmB43UEboMXzI',
        'token_type': 'bearer',
        'expires_in': 25,
        'username': 'adminuser'
      })
      return
    }
  }
  res.send({
    'error':'unsupported_grant_type',
    'error_description':'Some login error'
  })
})

// routes configuration
const rewriter = jsonServer.rewriter({
  '/api/v1/*': '/$1',
  '/garages/:garageId/routes': '/routes?garageId=:garageId',
  '/garages/:garageId/routes/:routeId': '/routes/:routeId',
  '/garages/:garageId/routes/:routeId/runs': '/runs?routeId=:routeId',  
  '/garages/:garageId/routes/:routeId/runs/:runId': '/runs/:runId',

})

server.use(rewriter)
server.use(router)

const PORT = 9062
server.listen(PORT, () => {
  console.log('JSON Server is running and listening on ' + PORT + ' port') //  eslint-disable-line no-console
})
