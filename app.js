const express = require('express');
const app = express();
const router = require('routes/pageRoutes.js').router;

app.use('/', router)

app.listen(3000, () => {
  console.log("Server has started");
})