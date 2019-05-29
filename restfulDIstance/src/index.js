const express = require('express')
const app = express()


const cors = require('cors')
app.use(express.json())
app.use(require('./routes'))


app.listen(3001, () => console.log('server on port 3001'))