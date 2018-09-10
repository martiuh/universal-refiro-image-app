import { Router } from 'express'

const API = Router()

API.get('*', (req, res) => {
  res.status(200)
  res.send(JSON.stringify({ respuesta: 'De la API' }))
})

export default API
