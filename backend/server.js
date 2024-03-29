const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/router')
require('dotenv/config')

const app = express()
app.use(express.json())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const corsOptions = {
    origin: '*',
    credential: true,
    optionSuccessStatus:200
}

app.use(cors(corsOptions))
app.use('/api', router)

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})