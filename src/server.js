
// GET => Buscar um recurso do back
// POST => Criar um recurso
// PUT => Atualizar uma informaçõa no back
// PATCH => Atualizar uma informações  especifica de um recur

// HTTP Status code

import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

// FORMAS DO FRONT ENVIAR INFORAÇÔES =>
  // Query Parametrs:  Usados para enviar dados simples e não sensíveis através da URL(ex: "http://localhost:3333/user?userId=1&name=Rafael")
  // Route Parameters: Identificação de rucurso(ex: "DELETE http://localhost:3333/users/1")
  // Request Body: Envio de informações de um formulario


const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)


  const route = routes.find(route => {
  return route.method === method && route.path.test(url)
  }) //chamara a função determina em routes 



  if (route) {
    const routeParams = req.url.match(route.path)

    console.log(routeParams);

    return route.handler(req, res)
  }// caso encontra uma rota retorna  handler com res e req

  return res.writeHead(404).end()
})

server.listen(3333)