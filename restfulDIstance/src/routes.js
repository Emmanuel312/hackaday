const express = require('express')
const routes = express.Router()
const geoLib = require('./controllers/geoLib')

routes.post('/distance', geoLib.Distance)
routes.post('/radiusdistance', geoLib.DistanceRadius)

module.exports = routes