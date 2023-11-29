const express = require('express')
const app = express()
const router = require('./routes/pageRoutes.js').router
const PORT = 3000

app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server has started at http://localhost:${PORT}`)
})