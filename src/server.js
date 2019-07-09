const express = require('express')
const app = express()

app.listen(process.env.SERVER_PORT, () => console.log(`Server listening on ${process.env.SERVER_PORT}`))