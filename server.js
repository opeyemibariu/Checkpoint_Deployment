require('dotenv').config()
const path = require('path')
const router = require('./routes/router')
const connectDB = require('./db/connectDB')
const express = require('express')
const app = express()

app.use(express.json());
app.use(express.static('./my_frontend/dist'));

app.use('/api/workers', router)
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, 'my_frontend', 'dist', 'index.html'));
});

const port = process.env.PORT || 5000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`Server is listening on port ${port}...`))
    } catch(error) {
        console.log(error)
    }
}

start()
